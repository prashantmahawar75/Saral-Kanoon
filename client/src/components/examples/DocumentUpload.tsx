import { DocumentUpload } from '../DocumentUpload'

export default function DocumentUploadExample() {
  return (
    <div className="p-4">
      <DocumentUpload 
        onFileSelect={(file) => console.log('File selected:', file.name)}
        isProcessing={false}
        progress={0}
      />
    </div>
  )
}