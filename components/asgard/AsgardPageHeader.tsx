import React from 'react';
import Link from 'next/link';
import { ChevronRight, Plus } from 'lucide-react';

interface AsgardPageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const AsgardPageHeader: React.FC<AsgardPageHeaderProps> = ({
  title,
  description,
  breadcrumb,
  actionLabel,
  onAction,
  actionIcon,
  children,
}) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-200 pb-3.5">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {children}
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-2xs hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {actionIcon || <Plus className="w-3.5 h-3.5" />}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

// Backwards compatibility export
export const PageHeader = AsgardPageHeader;
