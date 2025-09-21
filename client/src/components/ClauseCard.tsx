import { useState } from "react"
import { ChevronDown, ChevronRight, AlertCircle, AlertTriangle, Shield } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { RiskBadge, type RiskLevel } from "./RiskBadge"

interface ClauseCardProps {
  id: string
  title: string
  content: string
  riskLevel: RiskLevel
  explanation: string
  recommendation?: string
  section?: string
}

export function ClauseCard({ 
  id, 
  title, 
  content, 
  riskLevel, 
  explanation, 
  recommendation,
  section 
}: ClauseCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case "safe":
        return <Shield className="h-4 w-4 text-safe" />
      case "moderate":
        return <AlertTriangle className="h-4 w-4 text-warning" />
      case "high":
        return <AlertCircle className="h-4 w-4 text-danger" />
    }
  }

  const getRiskBorderColor = (level: RiskLevel) => {
    switch (level) {
      case "safe":
        return "border-l-safe"
      case "moderate":
        return "border-l-warning"
      case "high":
        return "border-l-danger"
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`border-l-4 ${getRiskBorderColor(riskLevel)} hover-elevate`}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer" data-testid={`card-clause-${id}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                {getRiskIcon(riskLevel)}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight">{title}</h3>
                    <RiskBadge level={riskLevel} />
                  </div>
                  {section && (
                    <p className="text-xs text-muted-foreground mb-2">
                      Section: {section}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {content.length > 120 ? `${content.substring(0, 120)}...` : content}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="shrink-0"
                data-testid={`button-expand-${id}`}
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Original Clause</h4>
                <div className="bg-muted p-3 rounded-md text-sm italic">
                  "{content}"
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Risk Analysis</h4>
                <p className="text-sm">{explanation}</p>
              </div>
              
              {recommendation && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Recommendation</h4>
                  <p className="text-sm text-primary">{recommendation}</p>
                </div>
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}