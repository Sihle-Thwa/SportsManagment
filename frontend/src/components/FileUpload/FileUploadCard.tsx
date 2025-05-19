import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadCardProps {
  title?: string;
  description?: string;
  acceptedFileTypes?: string; // e.g. ".jpg,.png,.svg,.gif"
  maxFileSize?: number; // in bytes
  maxDimensions?: { width: number; height: number }; // for images
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  className?: string;
}

export const FileUploadCard = ({
  title = "Upload and attach files",
  description = "Upload and attach files to this project.",
  acceptedFileTypes = ".svg,.png,.jpg,.gif",
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxDimensions = { width: 800, height: 400 },
  onFileSelect,
  onFileRemove,
  className,
}: FileUploadCardProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    
    setError(null);
    
    // Check file size
    if (file.size > maxFileSize) {
      setError(`File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Check file type based on extension
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedExtensions = acceptedFileTypes
      .split(',')
      .map(type => type.trim().replace('.', '').toLowerCase());
      
    if (fileExtension && !acceptedExtensions.includes(fileExtension)) {
      setError(`File type not supported. Please upload: ${acceptedFileTypes}`);
      return;
    }
    
    // For images, check dimensions
    if (file.type.startsWith('image/')) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        
        if (img.width > maxDimensions.width || img.height > maxDimensions.height) {
          setError(`Image dimensions should not exceed ${maxDimensions.width}×${maxDimensions.height} pixels`);
          return;
        }
        
        setSelectedFile(file);
        setPreview(objectUrl);
        onFileSelect(file);
      };
      
      img.src = objectUrl;
    } else {
      // For non-image files
      setSelectedFile(file);
      setPreview(null);
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (onFileRemove) onFileRemove();
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader className="text-center">
        <div className="mx-auto bg-gray-100 rounded-full p-4 mb-2">
          <Upload className="h-6 w-6 text-gray-600" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedFile ? (
          <div className="space-y-4">
            {preview && (
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="font-medium">{selectedFile.name}</p>
                <p className="text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-amber-500 mb-2">
                  <Upload className="h-6 w-6" />
                </div>
                <span className="text-amber-500 font-medium">Click to upload</span>
                <span className="text-gray-500 text-sm">or drag and drop</span>
                <span className="text-gray-400 text-xs">
                  {acceptedFileTypes.replace(/\./g, '').toUpperCase()} (max. {maxDimensions.width}×{maxDimensions.height}px)
                </span>
              </div>
            </label>
          </div>
        )}
        
        {error && (
          <div className="mt-3 text-red-500 text-sm">{error}</div>
        )}
        
        <div className="mt-4 flex justify-end">
          {!selectedFile ? (
            <Button
              variant="default"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Add Photo
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};