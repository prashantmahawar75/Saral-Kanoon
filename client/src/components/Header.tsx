import { Scale, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold" data-testid="text-app-title">LegalAssist</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Document Analysis</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" size="sm" data-testid="link-upload">
            <FileText className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
          <Button variant="ghost" size="sm" data-testid="link-help">
            Help
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}