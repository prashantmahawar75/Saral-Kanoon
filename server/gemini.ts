import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalysisResult, RiskLevel } from "@shared/schema";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeLegalDocument(text: string, filename: string): Promise<AnalysisResult> {
  try {
    // Truncate text if too long to avoid token limits (approximately 30,000 characters)
    const maxLength = 30000;
    const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    const systemPrompt = `You are a legal document analysis expert. Analyze the provided legal document and provide a comprehensive risk assessment.

For each clause in the document:
1. Identify the clause title and content
2. Assess risk level as "safe", "moderate", or "high"
3. Provide plain-language explanation
4. Give actionable recommendations

You MUST respond with ONLY valid JSON in this exact format:
{
  "summary": "Plain language summary of the document",
  "overallRisk": "safe|moderate|high",
  "keyInsights": [
    {
      "title": "Brief insight title",
      "description": "Description of the insight",
      "riskLevel": "safe|moderate|high"
    }
  ],
  "recommendations": ["List of actionable recommendations"],
  "clauses": [
    {
      "id": "unique_clause_id",
      "title": "Clause title",
      "content": "Original clause text",
      "riskLevel": "safe|moderate|high",
      "explanation": "Plain language explanation",
      "recommendation": "Specific recommendation for this clause",
      "section": "Section number or reference"
    }
  ],
  "riskStats": {
    "safe": 0,
    "moderate": 0,
    "high": 0,
    "total": 0
  }
}`;

    const prompt = `Please analyze this legal document: "${filename}"

Document content:
${truncatedText}

Provide a comprehensive analysis following the JSON format specified.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawJson = response.text();
    
    if (!rawJson) {
      throw new Error("Empty response from Gemini");
    }

    let analysis: AnalysisResult;
    try {
      analysis = JSON.parse(rawJson);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", rawJson);
      throw new Error("Invalid JSON response from AI analysis");
    }
    
    // Validate and calculate risk stats
    if (analysis.clauses && Array.isArray(analysis.clauses)) {
      const riskCounts = { safe: 0, moderate: 0, high: 0 };
      analysis.clauses.forEach(clause => {
        if (clause.riskLevel && ['safe', 'moderate', 'high'].includes(clause.riskLevel)) {
          riskCounts[clause.riskLevel]++;
        }
      });
      
      analysis.riskStats = {
        ...riskCounts,
        total: analysis.clauses.length
      };
    }

    return analysis;
    
  } catch (error) {
    console.error("Legal document analysis failed:", error);
    throw new Error(`Failed to analyze legal document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}