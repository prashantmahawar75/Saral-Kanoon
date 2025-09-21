import { RiskDashboard } from '../RiskDashboard'

export default function RiskDashboardExample() {
  const mockStats = {
    safe: 15,
    moderate: 4,
    high: 2,
    total: 21
  }

  return (
    <div className="p-4 max-w-4xl">
      <RiskDashboard 
        stats={mockStats}
        documentName="Commercial Lease Agreement - 123 Main St.pdf"
      />
    </div>
  )
}