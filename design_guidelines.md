# AI Legal Assistant Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from productivity tools like Notion and Linear, combined with professional services platforms. This utility-focused application prioritizes clarity, trust, and efficient document processing workflows.

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 220 90% 45% (Professional blue conveying trust and reliability)
- Success/Safe: 142 76% 36% (Green for safe clauses)
- Warning/Moderate: 38 92% 50% (Orange for moderate risk)
- Danger/High Risk: 0 84% 60% (Red for high-risk clauses)
- Background: 0 0% 100% (Pure white)
- Surface: 220 14% 96% (Light gray for cards)
- Text: 220 13% 18% (Dark gray for readability)

**Dark Mode:**
- Primary: 220 90% 60% (Lighter blue for contrast)
- Success/Safe: 142 70% 45% (Adjusted green)
- Warning/Moderate: 38 85% 60% (Adjusted orange)
- Danger/High Risk: 0 75% 65% (Adjusted red)
- Background: 220 13% 10% (Dark background)
- Surface: 220 13% 15% (Dark gray for cards)
- Text: 220 14% 96% (Light text)

### Typography
- **Primary Font**: Inter (Google Fonts) - excellent readability for legal content
- **Headings**: 600-700 weight, sizes from text-lg to text-4xl
- **Body**: 400 weight, text-sm to text-base
- **Legal Text**: 400 weight, slightly smaller for document excerpts

### Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 for consistent rhythm
- Small spacing: p-2, m-2 for tight elements
- Medium spacing: p-4, m-4 for component padding
- Large spacing: p-6, m-6 for section separation
- Extra large: p-8, m-8 for major layout divisions

### Component Library

#### Core Navigation
- Clean header with logo, minimal navigation (Upload, Dashboard, Help)
- Sidebar for document analysis results with collapsible sections
- Breadcrumb navigation for multi-step processes

#### Document Processing
- **Upload Zone**: Large drag-and-drop area with file type indicators
- **Progress Indicators**: Step-by-step process visualization
- **Analysis Cards**: Color-coded risk assessment cards with expandable details
- **Document Viewer**: Split-pane layout showing original and annotated versions

#### Data Display
- **Risk Dashboard**: Traffic light system with counters and percentages
- **Clause List**: Expandable items with risk badges and explanations
- **Summary Cards**: Key insights with action items
- **Download Buttons**: Primary actions for getting annotated documents

#### Forms & Inputs
- Clean file upload with multiple format support
- Language selection dropdown for audio output
- Settings panel for customizing analysis depth

#### Overlays
- Modal dialogs for detailed clause explanations
- Toast notifications for processing status
- Loading states with progress bars for AI analysis

### Key Design Principles
1. **Trust Through Clarity**: Clean, professional aesthetic that builds user confidence
2. **Information Hierarchy**: Clear visual distinction between safe, moderate, and high-risk content
3. **Progressive Disclosure**: Show summary first, allow drilling down into details
4. **Accessibility First**: High contrast ratios, screen reader support, keyboard navigation
5. **Minimal Animations**: Subtle transitions only for state changes and loading

### Visual Treatment
- Generous whitespace to prevent overwhelming users with legal complexity
- Consistent card-based layout for scannable information
- Color-coded system throughout (green/orange/red) for immediate risk recognition
- Professional, trustworthy aesthetic avoiding flashy design elements
- Focus on readability and comprehension over visual flair

### No Hero Image
This utility-focused application doesn't require a hero image. The interface should immediately present the document upload functionality as the primary call-to-action.