import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../Button/Button';
import { Upload } from 'lucide-react';

export interface FileUploadCardProps {
  title?: string;
  description?: string;
  acceptedFileTypes?: string; // e.g. ".jpg,.png,.svg,.gif"
  maxFileSize?: number; // in bytes
  maxDimensions?: { width: number; height: number }; // for images
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
}

export const FileUploadCard = ({
  title = "Upload and attach files",
  description = "Upload and attach files to this project.",
  acceptedFileTypes = ".svg,.png,.jpg,.gif",
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxDimensions = { width: 800, height: 400 },
  onFileSelect,
  onFileRemove,
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
    <Card className="card">
      <CardHeader className="card-header flex flex-col items-center">
        <div className="mx-auto">
          <Upload className="icon" />
        </div>
        <CardTitle className='card-header-title'>{title}</CardTitle>
        <CardDescription className='card-description'>{description}</CardDescription>
      </CardHeader>
      <CardContent className='card-body'>
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
              <div >
                <p >{selectedFile.name}</p>
                <p >
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="md"
                  className="btn--secondary"
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
              className="input-base hidden"
              onChange={handleFileChange}
              accept={acceptedFileTypes}
            />
            <label htmlFor="file-upload" className="label">
              <div className="flex flex-col items-center space-y-2">
                <div className=" mb-2">
                  <Upload className="" />
                </div>
                <span className="">Click to upload</span>
                <span className="">or drag and drop</span>
                <span className="">
                  {acceptedFileTypes.replace(/\./g, '').toUpperCase()} (max. {maxDimensions.width}×{maxDimensions.height}px)
                </span>
              </div>
            </label>
          </div>
        )}

        {error && (
          <div className="text-error">{error}</div>
        )}

        <div className="mt-4 flex justify-end">
          {!selectedFile ? (
            <Button

              variant="primary"
              size="md"
              className="btn--primary"
              fullWidth={false}
              iconPosition="left"
            >
              <Upload className="icon" />
              Add Photo
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};