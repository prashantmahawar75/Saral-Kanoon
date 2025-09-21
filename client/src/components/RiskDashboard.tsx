import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RiskBadge } from "./RiskBadge"
import { Shield, AlertTriangle, AlertCircle, FileText } from "lucide-react"

interface RiskStats {
  safe: number
  moderate: number
  high: number
  total: number
}

interface RiskDashboardProps {
  stats: RiskStats
  documentName?: string
}

export function RiskDashboard({ stats, documentName }: RiskDashboardProps) {
  const safePercentage = (stats.safe / stats.total) * 100
  const moderatePercentage = (stats.moderate / stats.total) * 100
  const highPercentage = (stats.high / stats.total) * 100

  const getOverallRisk = () => {
    if (stats.high > 0) return { level: "High", color: "text-danger", icon: AlertCircle }
    if (stats.moderate > 0) return { level: "Moderate", color: "text-warning", icon: AlertTriangle }
    return { level: "Low", color: "text-safe", icon: Shield }
  }

  const overallRisk = getOverallRisk()
  const OverallIcon = overallRisk.icon

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle className="text-lg">Document Analysis Summary</CardTitle>
          </div>
          {documentName && (
            <p className="text-sm text-muted-foreground" data-testid="text-document-name">
              {documentName}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Risk */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <OverallIcon className={`h-6 w-6 ${overallRisk.color}`} />
              <div>
                <h3 className="font-semibold">Overall Risk Level</h3>
                <p className="text-sm text-muted-foreground">Based on highest risk clauses</p>
              </div>
            </div>
            <div className={`text-xl font-bold ${overallRisk.color}`} data-testid="text-overall-risk">
              {overallRisk.level}
            </div>
          </div>

          {/* Risk Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-safe/5 rounded-lg border border-safe/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-safe" />
                <span className="font-semibold text-safe">Safe</span>
              </div>
              <div className="text-2xl font-bold" data-testid="count-safe">
                {stats.safe}
              </div>
              <div className="text-sm text-muted-foreground">
                {safePercentage.toFixed(0)}% of clauses
              </div>
            </div>

            <div className="text-center p-4 bg-warning/5 rounded-lg border border-warning/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="font-semibold text-warning">Moderate</span>
              </div>
              <div className="text-2xl font-bold" data-testid="count-moderate">
                {stats.moderate}
              </div>
              <div className="text-sm text-muted-foreground">
                {moderatePercentage.toFixed(0)}% of clauses
              </div>
            </div>

            <div className="text-center p-4 bg-danger/5 rounded-lg border border-danger/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-danger" />
                <span className="font-semibold text-danger">High Risk</span>
              </div>
              <div className="text-2xl font-bold" data-testid="count-high">
                {stats.high}
              </div>
              <div className="text-sm text-muted-foreground">
                {highPercentage.toFixed(0)}% of clauses
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Risk Distribution</span>
              <span>{stats.total} total clauses</span>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-muted">
              <div 
                className="bg-safe" 
                style={{ width: `${safePercentage}%` }}
                data-testid="progress-safe"
              />
              <div 
                className="bg-warning" 
                style={{ width: `${moderatePercentage}%` }}
                data-testid="progress-moderate"
              />
              <div 
                className="bg-danger" 
                style={{ width: `${highPercentage}%` }}
                data-testid="progress-high"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}