import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { isSupabaseConfigured } from '@/configs/supabase';

export const SupabaseConfigBanner: React.FC = () => {
  const configured = isSupabaseConfigured();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  if (configured) return null;

  const envSample = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-amber-900">
              Supabase Backend Setup Required
            </h4>
            <p className="text-xs text-amber-800 mt-0.5">
              Supabase credentials are not detected in your <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-amber-950">.env.local</code>. Configure them to enable live database persistence.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 shrink-0 px-2 py-1 rounded hover:bg-amber-100 transition-colors"
        >
          {isExpanded ? 'Hide Steps' : 'Setup Steps'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-amber-200 text-xs space-y-3">
          <ol className="list-decimal list-inside space-y-1 text-amber-900">
            <li>Open your Supabase project dashboard at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="underline font-medium">supabase.com</a>.</li>
            <li>Run the SQL commands from <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">supabase/schema.sql</code> in the Supabase SQL Editor.</li>
            <li>Create or update <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env.local</code> in your root directory with:</li>
          </ol>

          <div className="relative bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs">
            <pre>{envSample}</pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1 transition-colors"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p className="text-amber-800">
            Once added, restart the development server (<code className="bg-amber-100 px-1 py-0.5 rounded font-mono">npm run dev</code>) to apply the changes.
          </p>
        </div>
      )}
    </div>
  );
};
