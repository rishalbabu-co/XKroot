import { useState, useRef } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';
import { uploadProfilePhoto } from '../../lib/storage';

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (url: string) => void;
  currentPhoto: string;
}

export default function ImageUpload({ isOpen, onClose, onUpload, currentPhoto }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    try {
      setError(null);
      setLoading(true);

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to Firebase Storage
      const downloadURL = await uploadProfilePhoto(file);
      
      // Update profile
      onUpload(downloadURL);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-800 rounded-xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-50"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Update Profile Photo
        </h3>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Current and Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Photo</p>
              <img
                src={currentPhoto}
                alt="Current profile"
                className="w-32 h-32 rounded-xl object-cover"
              />
            </div>
            {previewUrl && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Preview</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center ${
              dragActive
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-300 dark:border-gray-600'
            } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              disabled={loading}
              className="hidden"
            />
            
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center space-y-3">
                  <Upload className="h-8 w-8 text-indigo-600 animate-bounce" />
                  <p className="text-gray-600 dark:text-gray-300">Uploading photo...</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 dark:text-gray-300">
                    Drag and drop your photo here, or
                  </p>
                  <button
                    onClick={() => inputRef.current?.click()}
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    Choose File
                  </button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supported formats: JPG, PNG, GIF (Max 5MB)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}