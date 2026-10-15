'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface AsgardSelectProps {
  options: (string | SelectOption)[];
  value: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  name?: string;
}

export const AsgardSelect: React.FC<AsgardSelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  label,
  error,
  helperText,
  disabled = false,
  searchable = false,
  multiple = false,
  required = false,
  size = 'md',
  className = '',
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [openUpward, setOpenUpward] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  // Normalize options to SelectOption[]
  const normalizedOptions: SelectOption[] = React.useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  // Filtered options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return normalizedOptions;
    const query = searchQuery.toLowerCase();
    return normalizedOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.description && opt.description.toLowerCase().includes(query))
    );
  }, [normalizedOptions, searchQuery]);

  // Check if a value is selected
  const isSelected = useCallback(
    (optValue: string) => {
      if (multiple && Array.isArray(value)) {
        return value.includes(optValue);
      }
      return value === optValue;
    },
    [value, multiple]
  );

  // Selected labels display
  const displayLabel = React.useMemo(() => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      const matched = normalizedOptions.filter((opt) => value.includes(opt.value));
      if (matched.length <= 2) {
        return matched.map((m) => m.label).join(', ');
      }
      return `${matched.length} selected`;
    }

    const matched = normalizedOptions.find((opt) => opt.value === value);
    return matched ? matched.label : placeholder;
  }, [value, normalizedOptions, placeholder, multiple]);

  // Auto-flip upward if viewport space is tight
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 260; // Estimated max-height of dropdown menu
      setOpenUpward(spaceBelow < menuHeight && rect.top > menuHeight);

      if (searchable && searchInputRef.current) {
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    }
  }, [isOpen, searchable]);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        triggerRef.current?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev < filteredOptions.length - 1 ? prev + 1 : 0;
          return next;
        });
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : filteredOptions.length - 1;
          return next;
        });
        break;

      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelectOption(filteredOptions[highlightedIndex]);
        }
        break;

      case 'Tab':
        setIsOpen(false);
        setSearchQuery('');
        break;
    }
  };

  const handleSelectOption = (opt: SelectOption) => {
    if (opt.disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : [];
      const existsIndex = currentValues.indexOf(opt.value);
      if (existsIndex > -1) {
        currentValues.splice(existsIndex, 1);
      } else {
        currentValues.push(opt.value);
      }
      onChange(currentValues);
    } else {
      onChange(opt.value);
      setIsOpen(false);
      setSearchQuery('');
      setHighlightedIndex(-1);
      triggerRef.current?.focus();
    }
  };

  // Size variations
  const sizeClasses = {
    sm: 'h-8 px-2.5 text-xs',
    md: 'h-10 px-3.5 text-xs sm:text-sm',
    lg: 'h-11 px-4 text-sm',
  };

  const hasValue = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== '' && value !== undefined && value !== null;

  return (
    <div className={`relative ${className}`} ref={containerRef} onKeyDown={handleKeyDown}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Hidden input for form integrations */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={Array.isArray(value) ? value.join(',') : value || ''}
        />
      )}

      {/* Dropdown Trigger */}
      <button
        ref={triggerRef}
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border transition-all text-left font-medium select-none cursor-pointer ${
          sizeClasses[size]
        } ${
          disabled
            ? 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed'
            : isOpen
            ? 'bg-white border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
            : error
            ? 'bg-rose-50/30 border-rose-300 text-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200 hover:border-slate-300 text-slate-800'
        }`}
      >
        <span
          className={`truncate ${
            hasValue ? 'text-slate-900 font-medium' : 'text-slate-400 font-normal'
          }`}
        >
          {displayLabel}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-indigo-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-900/10 overflow-hidden min-w-[200px] animate-in fade-in-0 zoom-in-95 duration-100 ${
            openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          {/* Search Box if Searchable */}
          {searchable && (
            <div className="p-2 border-b border-slate-100 bg-slate-50/60 sticky top-0 z-10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search options..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setHighlightedIndex(0);
                  }}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Options List */}
          <ul
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
            className="max-h-56 overflow-y-auto p-1.5 space-y-0.5 text-xs sm:text-sm focus:outline-none"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-3 text-center text-xs text-slate-400">
                No matching options found
              </li>
            ) : (
              filteredOptions.map((opt, idx) => {
                const selected = isSelected(opt.value);
                const isHighlighted = idx === highlightedIndex;

                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={opt.disabled}
                    onClick={() => handleSelectOption(opt)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors select-none ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed bg-transparent'
                        : selected
                        ? 'bg-indigo-50 text-indigo-950 font-semibold'
                        : isHighlighted
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <div className="truncate">
                        <p className="truncate leading-tight">{opt.label}</p>
                        {opt.description && (
                          <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">
                            {opt.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {selected && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0 stroke-[2.5]" />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}

      {/* Error or Helper Text */}
      {error ? (
        <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{helperText}</p>
      ) : null}
    </div>
  );
};
