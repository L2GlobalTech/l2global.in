import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Database,
  GitMerge,
  Code,
  Zap,
  BarChart3,
  ShieldCheck,
  Users,
  Cloud,
  Layers,
  Settings,
  Cpu,
  Workflow,
  Lock,
  RefreshCw,
  Globe,
  Award,
  Headphones,
  Rocket,
  FileText,
  Activity,
  Compass,
  Server,
  Sliders,
  Terminal,
  Target,
  Box,
  TrendingUp,
  Briefcase,
  LucideIcon,
} from 'lucide-react';

export interface HighlightIconOption {
  value: string;
  label: string;
  IconComponent: LucideIcon;
}

export const HIGHLIGHT_ICON_OPTIONS: HighlightIconOption[] = [
  { value: 'CheckCircle2', label: 'Checkmark', IconComponent: CheckCircle2 },
  { value: 'Sparkles', label: 'Sparkles / AI', IconComponent: Sparkles },
  { value: 'Database', label: 'Database / CRM', IconComponent: Database },
  { value: 'GitMerge', label: 'Integration / API', IconComponent: GitMerge },
  { value: 'Workflow', label: 'Workflow / Process', IconComponent: Workflow },
  { value: 'Zap', label: 'Automation / Speed', IconComponent: Zap },
  { value: 'Code', label: 'Custom Code / Apex', IconComponent: Code },
  { value: 'Cloud', label: 'Cloud Solutions', IconComponent: Cloud },
  { value: 'ShieldCheck', label: 'Security & Compliance', IconComponent: ShieldCheck },
  { value: 'BarChart3', label: 'Analytics & Reporting', IconComponent: BarChart3 },
  { value: 'Users', label: 'User Training & Team', IconComponent: Users },
  { value: 'Layers', label: 'Architecture / Stack', IconComponent: Layers },
  { value: 'Settings', label: 'Configuration & Setup', IconComponent: Settings },
  { value: 'Cpu', label: 'Compute & Logic', IconComponent: Cpu },
  { value: 'Lock', label: 'Governance & Privacy', IconComponent: Lock },
  { value: 'RefreshCw', label: 'Continuous Migration', IconComponent: RefreshCw },
  { value: 'Globe', label: 'Enterprise Global', IconComponent: Globe },
  { value: 'Award', label: 'Best Practices', IconComponent: Award },
  { value: 'Headphones', label: '24/7 Support', IconComponent: Headphones },
  { value: 'Rocket', label: 'Deployment & Launch', IconComponent: Rocket },
  { value: 'Target', label: 'Target / Objectives', IconComponent: Target },
  { value: 'TrendingUp', label: 'Productivity Growth', IconComponent: TrendingUp },
  { value: 'Server', label: 'Infrastructure & ERP', IconComponent: Server },
  { value: 'Sliders', label: 'Customization', IconComponent: Sliders },
];

const ICON_MAP: Record<string, LucideIcon> = {
  checkcircle2: CheckCircle2,
  check: CheckCircle2,
  sparkles: Sparkles,
  ai: Sparkles,
  database: Database,
  crm: Database,
  gitmerge: GitMerge,
  integration: GitMerge,
  workflow: Workflow,
  process: Workflow,
  zap: Zap,
  automation: Zap,
  code: Code,
  development: Code,
  cloud: Cloud,
  shieldcheck: ShieldCheck,
  shield: ShieldCheck,
  security: ShieldCheck,
  barchart3: BarChart3,
  barchart: BarChart3,
  analytics: BarChart3,
  reporting: BarChart3,
  users: Users,
  training: Users,
  team: Users,
  layers: Layers,
  settings: Settings,
  configuration: Settings,
  cpu: Cpu,
  lock: Lock,
  refreshcw: RefreshCw,
  refresh: RefreshCw,
  globe: Globe,
  award: Award,
  headphones: Headphones,
  support: Headphones,
  rocket: Rocket,
  target: Target,
  trendingup: TrendingUp,
  server: Server,
  erp: Server,
  sliders: Sliders,
  terminal: Terminal,
  filetext: FileText,
  activity: Activity,
  compass: Compass,
  box: Box,
  briefcase: Briefcase,
};

/**
 * Returns a React node for the given icon name string.
 * Gracefully defaults to a clean brand icon (Sparkles or CheckCircle2).
 */
export function renderHighlightIcon(
  iconName?: string | null,
  className: string = 'w-4 h-4'
): React.ReactNode {
  if (!iconName) {
    return <Sparkles className={className} />;
  }

  const key = iconName.toLowerCase().replace(/[\s-_]/g, '');
  const Component = ICON_MAP[key] || Sparkles;

  return <Component className={className} />;
}
