'use client';

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { getMediaPublicUrl } from '@/actions/mediaAction';

interface BlogImageThumbnailProps {
  mediaId?: string | null;
  alt?: string;
  className?: string;
}

export const BlogImageThumbnail: React.FC<BlogImageThumbnailProps> = ({
  mediaId,
  alt = 'Article cover',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (!mediaId || hasError) {
    return (
      <div
        className={`w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5 ${className}`}
      >
        <FileText className="w-5 h-5" />
      </div>
    );
  }

  const publicUrl = getMediaPublicUrl(mediaId, 'blogs');

  if (!publicUrl) {
    return (
      <div
        className={`w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5 ${className}`}
      >
        <FileText className="w-5 h-5" />
      </div>
    );
  }

  return (
    <div
      className={`w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 mt-0.5 relative ${className}`}
    >
      <img
        src={publicUrl}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
