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
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
      <div>
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-700 font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {actionIcon || <Plus className="w-4 h-4" />}
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

// Backwards compatibility export
export const PageHeader = AsgardPageHeader;
