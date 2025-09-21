import { ClauseCard } from '../ClauseCard'

export default function ClauseCardExample() {
  return (
    <div className="p-4 space-y-4 max-w-2xl">
      <ClauseCard
        id="1"
        title="Termination Clause"
        content="Either party may terminate this agreement with 30 days written notice for any reason or no reason at all."
        riskLevel="moderate"
        explanation="This clause allows for easy termination but provides adequate notice period. Consider if 30 days is sufficient for your business needs."
        recommendation="Request 60-90 days notice if you need more time to find alternatives."
        section="Section 8.1"
      />
      
      <ClauseCard
        id="2"
        title="Liability Limitation"
        content="In no event shall the company be liable for any indirect, incidental, special, or consequential damages."
        riskLevel="high"
        explanation="This clause severely limits the company's liability, potentially leaving you without recourse for significant damages."
        recommendation="Negotiate for exceptions in cases of gross negligence or willful misconduct."
        section="Section 12.3"
      />
    </div>
  )
}