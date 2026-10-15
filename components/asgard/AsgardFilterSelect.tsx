'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Filter } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface AsgardFilterSelectProps {
  options: (string | FilterOption)[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  labelPrefix?: string;
  allLabel?: string;
  className?: string;
}

export const AsgardFilterSelect: React.FC<AsgardFilterSelectProps> = ({
  options = [],
  value,
  onChange,
  icon,
  labelPrefix,
  allLabel = 'All',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options
  const normalizedOptions: FilterOption[] = React.useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  // Find currently selected label
  const activeOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = activeOption ? activeOption.label : allLabel;
  const isFiltered = value !== 'all' && value !== '';

  // Close on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {/* Filter Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all select-none cursor-pointer border ${
          isOpen
            ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 text-indigo-950 shadow-xs'
            : isFiltered
            ? 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100/70'
            : 'bg-slate-100 hover:bg-slate-200/80 border-transparent text-slate-700'
        }`}
      >
        <span className="shrink-0 text-slate-500">
          {icon || <Filter className="w-3.5 h-3.5" />}
        </span>

        <span className="truncate max-w-[140px] sm:max-w-[200px]">
          {labelPrefix && <span className="text-slate-400 font-normal mr-1">{labelPrefix}:</span>}
          <span className={isFiltered ? 'font-semibold text-indigo-900' : 'text-slate-700'}>
            {displayLabel}
          </span>
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 z-50 w-52 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-900/10 overflow-hidden py-1 animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="max-h-60 overflow-y-auto px-1 space-y-0.5 text-xs sm:text-sm">
            {normalizedOptions.map((opt) => {
              const selected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer select-none ${
                    selected
                      ? 'bg-indigo-50 text-indigo-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {opt.count !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-normal">
                        {opt.count}
                      </span>
                    )}
                    {selected && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
