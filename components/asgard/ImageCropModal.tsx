'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Grid,
  Maximize2,
  X,
  Check,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface ImageCropModalProps {
  isVisible: boolean;
  onClose: () => void;
  image: string;
  mimeType?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  showGrid?: boolean;
  onConfirm: (croppedImageBlobUrl: string) => void | Promise<void>;
}

// Calculate the bounding box dimensions of an image after rotation
function getRotatedSize(width: number, height: number, rotation: number) {
  const rad = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(rad));
  const cos = Math.abs(Math.cos(rad));
  return {
    width: Math.round(width * cos + height * sin),
    height: Math.round(width * sin + height * cos),
  };
}

// Helper to create an HTML Image element and ensure it is fully loaded
function createLoadedImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });
}

// Two-stage rotation-safe crop pixel extraction with full alpha transparency preservation
async function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number },
  zoom: number,
  rotation: number,
  cropBoxSize: { width: number; height: number },
  exportSize: { width: number; height: number },
  mimeType: string = 'image/png'
): Promise<string> {
  const image = await createLoadedImage(imageSrc);
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;

  if (!naturalWidth || !naturalHeight) {
    throw new Error('Invalid image natural dimensions');
  }

  // Stage 1: Create a rotation-safe intermediate canvas
  const rad = (rotation * Math.PI) / 180;
  const rotatedSize = getRotatedSize(naturalWidth, naturalHeight, rotation);

  const rotCanvas = document.createElement('canvas');
  rotCanvas.width = rotatedSize.width;
  rotCanvas.height = rotatedSize.height;
  const rotCtx = rotCanvas.getContext('2d');

  if (!rotCtx) {
    throw new Error('Failed to create intermediate canvas context');
  }

  // Clear rect to guarantee transparent alpha background
  rotCtx.clearRect(0, 0, rotatedSize.width, rotatedSize.height);
  rotCtx.imageSmoothingEnabled = true;
  rotCtx.imageSmoothingQuality = 'high';

  // Translate to center and rotate around center
  rotCtx.translate(rotatedSize.width / 2, rotatedSize.height / 2);
  rotCtx.rotate(rad);
  rotCtx.drawImage(image, -naturalWidth / 2, -naturalHeight / 2);

  // Stage 2: Calculate the exact pixel sub-rectangle inside the rotated canvas
  const { width: Cw, height: Ch } = cropBoxSize;
  const baseScale = Math.max(Cw / rotatedSize.width, Ch / rotatedSize.height);
  const displayedBaseW = rotatedSize.width * baseScale;
  const scale = rotatedSize.width / (displayedBaseW * zoom);

  const cropNatW = Cw * scale;
  const cropNatH = Ch * scale;
  const centerX = rotatedSize.width / 2 - crop.x * scale;
  const centerY = rotatedSize.height / 2 - crop.y * scale;

  let sourceX = centerX - cropNatW / 2;
  let sourceY = centerY - cropNatH / 2;

  // Clamp within rotated canvas bounds
  sourceX = Math.max(0, Math.min(sourceX, rotatedSize.width - cropNatW));
  sourceY = Math.max(0, Math.min(sourceY, rotatedSize.height - cropNatH));

  // Create final export canvas
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = exportSize.width;
  finalCanvas.height = exportSize.height;
  const finalCtx = finalCanvas.getContext('2d');

  if (!finalCtx) {
    throw new Error('Failed to create final canvas context');
  }

  // Clear final canvas to maintain full alpha transparency
  finalCtx.clearRect(0, 0, exportSize.width, exportSize.height);
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';

  finalCtx.drawImage(
    rotCanvas,
    sourceX,
    sourceY,
    cropNatW,
    cropNatH,
    0,
    0,
    exportSize.width,
    exportSize.height
  );

  // Determine export MIME type (default to image/png to strictly preserve transparency)
  const isJpeg = mimeType === 'image/jpeg' || mimeType === 'image/jpg';
  const targetMime = isJpeg ? 'image/jpeg' : 'image/png';

  return new Promise((resolve, reject) => {
    finalCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas export to Blob failed'));
          return;
        }
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      },
      targetMime,
      0.95
    );
  });
}

export default function ImageCropModal({
  isVisible,
  onClose,
  image,
  mimeType,
  width,
  height,
  aspectRatio,
  showGrid = true,
  onConfirm,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [gridVisible, setGridVisible] = useState(showGrid);
  const [isProcessing, setIsProcessing] = useState(false);
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
  const [cropBoxDimensions, setCropBoxDimensions] = useState({ width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number; cropX: number; cropY: number } | null>(null);
  const touchDistanceRef = useRef<number | null>(null);

  // Dynamic dimension calculations:
  // If width is defined -> use width, otherwise full image natural width (fallback 1200)
  // If height is defined -> use height, otherwise full image natural height (fallback 800)
  const effectiveNaturalWidth = naturalSize.width || 1200;
  const effectiveNaturalHeight = naturalSize.height || 800;

  const exportWidth = useMemo(() => {
    if (width) return width;
    if (aspectRatio && height) return Math.round(height * aspectRatio);
    return effectiveNaturalWidth;
  }, [width, height, aspectRatio, effectiveNaturalWidth]);

  const exportHeight = useMemo(() => {
    if (height) return height;
    if (aspectRatio && width) return Math.round(width / aspectRatio);
    return effectiveNaturalHeight;
  }, [height, width, aspectRatio, effectiveNaturalHeight]);

  const targetAspectRatio = useMemo(() => {
    if (aspectRatio) return aspectRatio;
    if (exportWidth && exportHeight) return exportWidth / exportHeight;
    return 1.6;
  }, [aspectRatio, exportWidth, exportHeight]);

  // Measure crop box dimensions on mount, image load, and window resize
  const updateCropBoxSize = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      setCropBoxDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  // ResizeObserver to always keep cropBoxDimensions in sync with DOM
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    updateCropBoxSize();

    const observer = new ResizeObserver(() => {
      updateCropBoxSize();
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isVisible, updateCropBoxSize, targetAspectRatio]);

  // Reset state when modal opens or new image is selected
  useEffect(() => {
    if (isVisible) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
      setGridVisible(showGrid);
      setIsProcessing(false);

      // Preload image to get natural dimensions
      const img = new Image();
      img.onload = () => {
        setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
        setTimeout(updateCropBoxSize, 50);
      };
      img.src = image;

      // Small delay to allow modal layout to settle
      const timer = setTimeout(updateCropBoxSize, 50);
      window.addEventListener('resize', updateCropBoxSize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateCropBoxSize);
      };
    }
  }, [isVisible, image, showGrid, updateCropBoxSize]);

  // Calculate max allowable drag displacement (covering the crop box completely)
  const maxOffsets = useMemo(() => {
    if (
      cropBoxDimensions.width === 0 ||
      cropBoxDimensions.height === 0 ||
      naturalSize.width === 0 ||
      naturalSize.height === 0
    ) {
      return { x: 0, y: 0 };
    }

    const rotatedSize = getRotatedSize(naturalSize.width, naturalSize.height, rotation);
    const baseScale = Math.max(
      cropBoxDimensions.width / rotatedSize.width,
      cropBoxDimensions.height / rotatedSize.height
    );

    const renderedW = rotatedSize.width * baseScale * zoom;
    const renderedH = rotatedSize.height * baseScale * zoom;

    const maxOffsetX = Math.max(0, (renderedW - cropBoxDimensions.width) / 2);
    const maxOffsetY = Math.max(0, (renderedH - cropBoxDimensions.height) / 2);

    return { x: maxOffsetX, y: maxOffsetY };
  }, [cropBoxDimensions, naturalSize, rotation, zoom]);

  // Clamp crop position within valid bounds
  const clampedCrop = useMemo(() => {
    return {
      x: Math.min(Math.max(crop.x, -maxOffsets.x), maxOffsets.x),
      y: Math.min(Math.max(crop.y, -maxOffsets.y), maxOffsets.y),
    };
  }, [crop, maxOffsets]);

  // Pointer event handlers for unified mouse & touch drag
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      cropX: clampedCrop.x,
      cropY: clampedCrop.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;

    const newX = pointerStartRef.current.cropX + deltaX;
    const newY = pointerStartRef.current.cropY + deltaY;

    setCrop({
      x: Math.min(Math.max(newX, -maxOffsets.x), maxOffsets.x),
      y: Math.min(Math.max(newY, -maxOffsets.y), maxOffsets.y),
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStartRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      pointerStartRef.current = null;
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((prev) => +(Math.min(Math.max(1, prev + factor), 3.5)).toFixed(2));
  };

  // Touch pinch zoom
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchDistanceRef.current !== null) {
        const diff = (dist - touchDistanceRef.current) * 0.01;
        setZoom((prev) => +(Math.min(Math.max(1, prev + diff), 3.5)).toFixed(2));
      }
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchEnd = () => {
    touchDistanceRef.current = null;
  };

  // Rotate 90 degrees
  const handleRotateStep = (direction: 'left' | 'right') => {
    const delta = direction === 'right' ? 90 : -90;
    let next = (rotation + delta) % 360;
    if (next < -180) next += 360;
    if (next > 180) next -= 360;
    setRotation(next);
  };

  // Confirm and Save Crop
  const handleSaveCrop = async () => {
    if (cropBoxDimensions.width === 0 || cropBoxDimensions.height === 0) {
      toast.error('Crop viewport not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    try {
      const croppedBlobUrl = await getCroppedImg(
        image,
        clampedCrop,
        zoom,
        rotation,
        cropBoxDimensions,
        { width: exportWidth, height: exportHeight },
        mimeType
      );

      await onConfirm(croppedBlobUrl);
    } catch (err: any) {
      console.error('Error cropping image:', err);
      toast.error(err.message || 'Failed to crop image.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Maximize2 size={18} className="text-indigo-600" />
              <span>Crop & Position Media</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Drag image to frame &bull; Export size: {exportWidth} × {exportHeight} ({targetAspectRatio.toFixed(2)})
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Crop Viewport Canvas Area */}
        <div className="flex-1 bg-slate-900 p-6 flex items-center justify-center overflow-hidden min-h-[380px] relative">
          <div
            ref={containerRef}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              aspectRatio: `${targetAspectRatio}`,
              width:
                targetAspectRatio >= 620 / 420
                  ? 'min(100%, 620px)'
                  : `min(100%, ${Math.round(420 * targetAspectRatio)}px)`,
              height:
                targetAspectRatio >= 620 / 420
                  ? `min(420px, calc(min(100%, 620px) / ${targetAspectRatio}))`
                  : 'min(420px, 100%)',
            }}
            className="relative border-2 border-dashed border-indigo-400 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-slate-800 [background-image:linear-gradient(45deg,#334155_25%,transparent_25%),linear-gradient(-45deg,#334155_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#334155_75%),linear-gradient(-45deg,transparent_75%,#334155_75%)] [background-size:16px_16px] [background-position:0_0,0_8px,8px_-8px,-8px_0px] flex items-center justify-center rounded-lg touch-none"
          >
            {/* Centered Image with accurate transformation */}
            <img
              src={image}
              alt="Crop area"
              draggable={false}
              style={{
                transform: `translate(${clampedCrop.x}px, ${clampedCrop.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                transformOrigin: 'center center',
                transition: pointerStartRef.current ? 'none' : 'transform 0.08s ease-out',
              }}
              className="max-w-none max-h-none w-full h-full object-cover pointer-events-none select-none"
            />

            {/* 3x3 Grid Overlay */}
            {gridVisible && (
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10">
                <div className="border-r border-b border-white/30" />
                <div className="border-r border-b border-white/30" />
                <div className="border-b border-white/30" />
                <div className="border-r border-b border-white/30" />
                <div className="border-r border-b border-white/30" />
                <div className="border-b border-white/30" />
                <div className="border-r border-white/30" />
                <div className="border-r border-white/30" />
                <div />
              </div>
            )}
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            {/* Zoom Control */}
            <div className="flex items-center gap-3">
              <ZoomOut size={16} className="text-gray-400 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Zoom</span>
                  <span className="font-mono text-gray-500">{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3.5"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <ZoomIn size={16} className="text-gray-400 shrink-0" />
            </div>

            {/* Rotation Control */}
            <div className="flex items-center gap-3">
              <RotateCcw size={16} className="text-gray-400 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="font-semibold text-gray-800">Rotation</span>
                  <span className="font-mono text-gray-500">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <RotateCw size={16} className="text-gray-400 shrink-0" />
            </div>
          </div>

          {/* Quick Buttons & Confirmation */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
            {/* Quick Rotate & Tool Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleRotateStep('left')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Rotate 90° Left"
              >
                <RotateCcw size={13} />
                <span>-90°</span>
              </button>

              <button
                type="button"
                onClick={() => handleRotateStep('right')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Rotate 90° Right"
              >
                <RotateCw size={13} />
                <span>+90°</span>
              </button>

              <button
                type="button"
                onClick={() => setGridVisible(!gridVisible)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                  gridVisible
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Grid size={13} />
                <span>Grid</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setZoom(1);
                  setRotation(0);
                  setCrop({ x: 0, y: 0 });
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw size={13} />
                <span>Reset</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCrop}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-6 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save Crop</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
