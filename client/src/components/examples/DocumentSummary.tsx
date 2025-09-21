import { DocumentSummary } from '../DocumentSummary'

export default function DocumentSummaryExample() {
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

  return (
    <div className="p-4 max-w-4xl">
      <DocumentSummary
        summary={mockSummary}
        keyInsights={mockInsights}
        recommendations={mockRecommendations}
        onDownload={() => console.log('Download clicked')}
        onAudioExplanation={() => console.log('Audio explanation clicked')}
        onAskQuestion={() => console.log('Ask question clicked')}
      />
    </div>
  )
}