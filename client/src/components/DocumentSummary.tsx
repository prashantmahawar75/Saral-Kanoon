import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, MessageSquare, Volume2 } from "lucide-react"
import { RiskBadge, type RiskLevel } from "./RiskBadge"

interface KeyInsight {
  title: string
  description: string
  riskLevel: RiskLevel
}

interface DocumentSummaryProps {
  summary: string
  keyInsights: KeyInsight[]
  recommendations: string[]
  onDownload?: () => void
  onAudioExplanation?: () => void
  onAskQuestion?: () => void
}

export function DocumentSummary({ 
  summary, 
  keyInsights, 
  recommendations,
  onDownload,
  onAudioExplanation,
  onAskQuestion
}: DocumentSummaryProps) {
  return (
    <div className="space-y-6">
      {/* Plain Language Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Plain Language Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed" data-testid="text-summary">
            {summary}
          </p>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {keyInsights.map((insight, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
              data-testid={`insight-${index}`}
            >
              <RiskBadge level={insight.riskLevel} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 text-sm"
                data-testid={`recommendation-${index}`}
              >
                <span className="text-primary font-medium shrink-0">{index + 1}.</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Interact</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button 
            onClick={() => {
              console.log("Download annotated document") // todo: remove mock functionality
              onDownload?.()
            }}
            className="flex items-center gap-2"
            data-testid="button-download"
          >
            <Download className="h-4 w-4" />
            Download Annotated Document
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {
              console.log("Audio explanation requested") // todo: remove mock functionality
              onAudioExplanation?.()
            }}
            className="flex items-center gap-2"
            data-testid="button-audio"
          >
            <Volume2 className="h-4 w-4" />
            Audio Explanation
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => {
              console.log("Ask question about document") // todo: remove mock functionality
              onAskQuestion?.()
            }}
            className="flex items-center gap-2"
            data-testid="button-ask-question"
          >
            <MessageSquare className="h-4 w-4" />
            Ask Questions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}