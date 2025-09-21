import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface DocumentUploadProps {
  onFileSelect: (file: File) => void
  isProcessing?: boolean
  progress?: number
}

export function DocumentUpload({ onFileSelect, isProcessing = false, progress = 0 }: DocumentUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setUploadStatus("uploading")
      onFileSelect(file)
      
      // Simulate upload completion for demo
      setTimeout(() => {
        setUploadStatus("success")
        console.log("File selected:", file.name) // todo: remove mock functionality
      }, 1000)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isProcessing
  })

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "uploading":
        return <Upload className="h-8 w-8 text-primary animate-pulse" />
      case "success":
        return <CheckCircle className="h-8 w-8 text-safe" />
      case "error":
        return <AlertCircle className="h-8 w-8 text-danger" />
      default:
        return <FileText className="h-8 w-8 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Uploading document..."
      case "success":
        return "Document uploaded successfully!"
      case "error":
        return "Upload failed. Please try again."
      default:
        return isDragActive ? "Drop your document here" : "Drag & drop a legal document, or click to browse"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Upload Legal Document</CardTitle>
        <CardDescription>
          Support for PDF, DOC, DOCX, and TXT files up to 10MB
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
            ${isProcessing ? "opacity-50 cursor-not-allowed" : "hover-elevate"}
          `}
          data-testid="upload-zone"
        >
          <input {...getInputProps()} data-testid="input-file" />
          
          <div className="flex flex-col items-center gap-4">
            {getStatusIcon()}
            
            <div>
              <p className="text-lg font-medium">{getStatusText()}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Maximum file size: 10MB
              </p>
            </div>

            {uploadStatus === "idle" && (
              <Button variant="outline" data-testid="button-browse">
                Browse Files
              </Button>
            )}
          </div>
        </div>

        {isProcessing && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Analyzing document...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}