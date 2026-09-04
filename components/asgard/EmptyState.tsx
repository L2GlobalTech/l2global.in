import React from 'react';
import { Plus, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center my-4">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
        {icon || <FolderOpen className="w-7 h-7 stroke-[1.5]" />}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-sm sm:text-base text-slate-500 max-w-md mt-1.5 mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs hover:shadow cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
