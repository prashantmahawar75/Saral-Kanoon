import { useState } from "react"
import { DocumentUpload } from "@/components/DocumentUpload"
import { RiskDashboard } from "@/components/RiskDashboard"
import { DocumentSummary } from "@/components/DocumentSummary"
import { ClauseCard } from "@/components/ClauseCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"

type ViewState = "upload" | "analysis"

export default function HomePage() {
  const [viewState, setViewState] = useState<ViewState>("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  // todo: remove mock functionality
  const mockStats = {
    safe: 15,
    moderate: 4,
    high: 2,
    total: 21
  }

  const mockSummary = "This commercial lease agreement establishes a 5-year lease for office space with automatic renewal clauses and significant liability limitations. The tenant is responsible for all maintenance, utilities, and property taxes. There are concerning clauses around termination rights that heavily favor the landlord."

  const mockInsights = [
    {
      title: "Automatic Renewal",
      description: "Contract automatically renews unless terminated with 6 months notice",
      riskLevel: "moderate" as const
    },
    {
      title: "Liability Waiver", 
      description: "Tenant waives right to claim damages for most property issues",
      riskLevel: "high" as const
    },
    {
      title: "Payment Terms",
      description: "Standard monthly payment with 3% annual increases",
      riskLevel: "safe" as const
    }
  ]

  const mockRecommendations = [
    "Negotiate the liability waiver to exclude gross negligence cases",
    "Request shorter notice period for non-renewal (3 months instead of 6)",
    "Consider adding a break clause after 3 years",
    "Review insurance requirements with your broker",
    "Have a real estate attorney review before signing"
  ]

  const mockClauses = [
    {
      id: "1",
      title: "Automatic Renewal Clause",
      content: "This lease shall automatically renew for successive one-year terms unless either party provides written notice of non-renewal at least six (6) months prior to the end of the current term.",
      riskLevel: "moderate" as const,
      explanation: "Automatic renewal with 6-month notice requirement could lock you into unwanted extensions if you forget to provide notice.",
      recommendation: "Negotiate for a 90-day notice period and consider adding calendar reminders.",
      section: "Section 3.2"
    },
    {
      id: "2", 
      title: "Liability Limitation",
      content: "Landlord shall not be liable for any damage to tenant's property or business interruption arising from building defects, utility failures, or force majeure events.",
      riskLevel: "high" as const,
      explanation: "This broad liability waiver could leave you without recourse for significant business losses caused by building issues.",
      recommendation: "Add exceptions for landlord negligence and ensure adequate insurance coverage.",
      section: "Section 8.4"
    },
    {
      id: "3",
      title: "Rent Payment Terms", 
      content: "Rent is due on the first day of each month with a 5-day grace period. Late fees of $50 plus 1.5% per month apply thereafter.",
      riskLevel: "safe" as const,
      explanation: "Standard payment terms with reasonable grace period and market-rate late fees.",
      recommendation: "Consider setting up automatic payments to avoid late fees.",
      section: "Section 4.1"
    }
  ]

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setIsProcessing(true)
    setProgress(0)

    // Simulate processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setViewState("analysis")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleBackToUpload = () => {
    setViewState("upload")
    setSelectedFile(null)
    setProgress(0)
  }

  if (viewState === "upload") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" data-testid="text-hero-title">
              Transform Legal Documents into Clear Guidance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your legal document and get instant AI-powered analysis with risk assessment, 
              plain-language summaries, and actionable recommendations.
            </p>
          </div>

          {/* Upload Section */}
          <DocumentUpload 
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
            progress={progress}
          />

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-safe" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Every clause is analyzed and color-coded as safe, moderate risk, or high risk 
                  with detailed explanations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-warning" />
                  Plain Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complex legal jargon is translated into clear, accessible language 
                  anyone can understand.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Actionable Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get specific recommendations and next steps to protect your interests 
                  before signing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleBackToUpload}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Document Analysis</h1>
            <p className="text-sm text-muted-foreground">
              {selectedFile?.name || "Commercial Lease Agreement.pdf"}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Dashboard and Summary */}
          <div className="lg:col-span-1 space-y-6">
            <RiskDashboard 
              stats={mockStats}
              documentName={selectedFile?.name}
            />
            
            <DocumentSummary
              summary={mockSummary}
              keyInsights={mockInsights}
              recommendations={mockRecommendations}
              onDownload={() => console.log("Download annotated document")}
              onAudioExplanation={() => console.log("Audio explanation")}
              onAskQuestion={() => console.log("Ask question")}
            />
          </div>

          {/* Right Column - Clause Analysis */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Clause-by-Clause Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockClauses.map((clause) => (
                  <ClauseCard key={clause.id} {...clause} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}