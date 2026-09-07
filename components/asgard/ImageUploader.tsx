'use client';

import React, { useState, useRef, useEffect } from 'react';
import ImageCropModal from './ImageCropModal';
import { Upload, X, RefreshCw, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  value?: string | null;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
  label?: string;
  description?: string;
  folder?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  showGrid?: boolean;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  label = 'Upload Image',
  description = 'PNG, JPG, WebP, GIF, or SVG (max 50MB)',
  folder = 'blogs',
  width = 800,
  height = 500,
  aspectRatio = 1.6,
  showGrid = true,
  accept = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml',
  maxSizeMB = 50,
  disabled = false,
  className = '',
}: ImageUploaderProps) {
  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [selectedRawBlobUrl, setSelectedRawBlobUrl] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const rawFileRef = useRef<File | null>(null);

  // Sync external value changes (e.g. when editing existing record)
  useEffect(() => {
    if (value !== undefined) {
      setPreviewUrl(value || null);
    }
  }, [value]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (selectedRawBlobUrl) {
        URL.revokeObjectURL(selectedRawBlobUrl);
      }
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [selectedRawBlobUrl, previewUrl]);

  const validateAndProcessFile = (file: File) => {
    if (disabled) return;

    // Validate mime type
    const validTypes = accept.split(',').map((t) => t.trim().toLowerCase());
    const isTypeValid = validTypes.some((type) => {
      if (type.endsWith('/*')) {
        const prefix = type.replace('/*', '');
        return file.type.toLowerCase().startsWith(prefix);
      }
      return file.type.toLowerCase() === type;
    });

    if (!isTypeValid) {
      toast.error('Invalid image format. Please select JPG, PNG, or WebP.');
      return;
    }

    // Validate size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`File is too large. Maximum size allowed is ${maxSizeMB}MB.`);
      return;
    }

    // Revoke any previous raw blob URL
    if (selectedRawBlobUrl) {
      URL.revokeObjectURL(selectedRawBlobUrl);
    }

    rawFileRef.current = file;
    const blobUrl = URL.createObjectURL(file);
    setSelectedRawBlobUrl(blobUrl);
    setIsCropModalVisible(true);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
    // Reset file input value so user can re-select same file if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (disabled) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const handleCropConfirm = async (croppedBlobUrl: string) => {
    try {
      // Convert Blob URL to real JavaScript File object
      const response = await fetch(croppedBlobUrl);
      const blob = await response.blob();

      const originalName = rawFileRef.current?.name || 'image.jpg';
      const cleanBaseName = originalName.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const finalFileName = `${cleanBaseName}-cropped-${Date.now()}.jpg`;

      const finalFile = new File([blob], finalFileName, { type: 'image/jpeg' });

      // Clean up previous preview blob if local
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(croppedBlobUrl);
      setIsCropModalVisible(false);

      // Pass final cropped File to parent
      onChange(finalFile);
      toast.success('Image cropped successfully!');
    } catch (error) {
      console.error('Error creating cropped file:', error);
      toast.error('Failed to crop image.');
    } finally {
      // Revoke raw original image URL
      if (selectedRawBlobUrl) {
        URL.revokeObjectURL(selectedRawBlobUrl);
        setSelectedRawBlobUrl('');
      }
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    rawFileRef.current = null;
    onChange(null);
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Upload Dropzone (When No Image) */}
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer select-none text-center ${
            disabled
              ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
              : isDraggingOver
              ? 'border-indigo-600 bg-emerald-50/50 scale-[0.99]'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50/40 hover:bg-gray-50'
          }`}
        >
          <div className="w-12 h-12 mb-3 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-gray-500 group-hover:text-indigo-600 group-hover:scale-110 transition-transform">
            <Upload size={20} />
          </div>

          <p className="text-sm font-semibold text-gray-800">
            {label}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Click to upload or drag & drop &bull; {description}
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            Aspect Ratio: {width} × {height} ({aspectRatio.toFixed(2)})
          </p>
        </div>
      ) : (
        /* Cropped / Existing Preview Card */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          {/* Image Canvas Container */}
          <div
            style={{ aspectRatio: `${aspectRatio}` }}
            className="w-full max-h-[360px] bg-gray-900 relative flex items-center justify-center overflow-hidden group"
          >
            <img
              src={previewUrl}
              alt="Media preview"
              className="w-full h-full object-cover"
              onError={() => {
                setPreviewUrl(null);
              }}
            />

            {/* Hover Actions Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => !disabled && fileInputRef.current?.click()}
                disabled={disabled}
                className="px-3.5 py-2 text-xs font-bold bg-white/90 hover:bg-white text-gray-900 rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={disabled}
                className="px-3.5 py-2 text-xs font-bold bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <X size={13} />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Bottom Toolbar Controls */}
          <div className="px-4 py-3 bg-gray-50/80 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ImageIcon size={14} className="text-emerald-800" />
              <span className="font-medium text-gray-700">Image Ready</span>
              <span>&bull;</span>
              <span>{width}×{height}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => !disabled && fileInputRef.current?.click()}
                disabled={disabled}
                className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Change Image</span>
              </button>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={disabled}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X size={12} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Image Crop Modal */}
      <ImageCropModal
        isVisible={isCropModalVisible}
        onClose={() => {
          setIsCropModalVisible(false);
          if (selectedRawBlobUrl) {
            URL.revokeObjectURL(selectedRawBlobUrl);
            setSelectedRawBlobUrl('');
          }
        }}
        image={selectedRawBlobUrl}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        showGrid={showGrid}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
