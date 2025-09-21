import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, AlertCircle } from "lucide-react"

export type RiskLevel = "safe" | "moderate" | "high"

interface RiskBadgeProps {
  level: RiskLevel
  count?: number
  className?: string
}

export function RiskBadge({ level, count, className }: RiskBadgeProps) {
  const getRiskConfig = (level: RiskLevel) => {
    switch (level) {
      case "safe":
        return {
          label: "Safe",
          icon: Shield,
          className: "bg-safe/10 text-safe border-safe/20 hover:bg-safe/20"
        }
      case "moderate":
        return {
          label: "Moderate Risk",
          icon: AlertTriangle,
          className: "bg-warning/10 text-warning border-warning/20 hover:bg-warning/20"
        }
      case "high":
        return {
          label: "High Risk",
          icon: AlertCircle,
          className: "bg-danger/10 text-danger border-danger/20 hover:bg-danger/20"
        }
    }
  }

  const config = getRiskConfig(level)
  const Icon = config.icon

  return (
    <Badge 
      variant="outline" 
      className={`${config.className} ${className}`}
      data-testid={`badge-risk-${level}`}
    >
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
      {count !== undefined && ` (${count})`}
    </Badge>
  )
}