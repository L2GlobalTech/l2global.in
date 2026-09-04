import React from 'react';

interface LoadingStateProps {
  rows?: number;
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  rows = 5,
  message = 'Loading data...',
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center gap-3 text-sm text-slate-500">
        <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-indigo-600 animate-spin" />
        <span>{message}</span>
      </div>
      <div className="divide-y divide-slate-100 animate-pulse p-4 space-y-4">
        {Array.from({ length: rows }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-4 py-2">
            <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </div>
            <div className="w-20 h-6 bg-slate-200 rounded-full" />
            <div className="w-16 h-8 bg-slate-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
