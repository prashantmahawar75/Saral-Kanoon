import { RiskBadge } from '../RiskBadge'

export default function RiskBadgeExample() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <RiskBadge level="safe" count={12} />
        <RiskBadge level="moderate" count={3} />
        <RiskBadge level="high" count={1} />
      </div>
    </div>
  )
}