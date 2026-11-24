import type { CSSProperties } from "react";
import {
  AlertCircle, AlertTriangle, ArrowRight, ArrowUp, BarChart3, Banknote,
  Briefcase, Building2, Calculator, Calendar, Check, ChevronDown, ChevronUp,
  ClipboardList, Cloud, Database, Factory, FileText, FlaskConical, Flag,
  Gauge, Globe, GraduationCap, Heart, History, Home, Key, Landmark,
  LayoutGrid, LayoutList, Lightbulb, Lock, Mail, Maximize2, MessageCircle,
  MessageSquare, PenSquare, Phone, PieChart, Play, Rocket, Scale, Search,
  Send, Server, Settings, Shield, ShieldCheck, Target, TrendingUp, Trophy,
  User, Users, Workflow, X, XCircle,
  type LucideIcon,
} from "lucide-react";

/** Semantic icon names used by pages and data files, mapped to lucide-react icons. */
const ICONS: Record<string, LucideIcon> = {
  accelerated: Rocket,
  accept: Check,
  "action-settings": Settings,
  "arrow-right": ArrowRight,
  "bar-chart": BarChart3,
  building: Building2,
  calculator: Calculator,
  calendar: Calendar,
  cloud: Cloud,
  collaborate: Users,
  comment: MessageSquare,
  compare: Scale,
  database: Database,
  decline: X,
  "detail-view": LayoutList,
  document: FileText,
  down: ChevronDown,
  email: Mail,
  employee: User,
  error: AlertCircle,
  factory: Factory,
  form: ClipboardList,
  globe: Globe,
  group: Users,
  heart: Heart,
  hint: Lightbulb,
  history: History,
  home: Home,
  "it-host": Server,
  "journey-arrive": Flag,
  key: Key,
  lab: FlaskConical,
  "lead-outdated": History,
  "learning-assistant": GraduationCap,
  lightbulb: Lightbulb,
  locked: Lock,
  "message-popup": MessageCircle,
  "money-bills": Banknote,
  "navigation-down-arrow": ChevronDown,
  "navigation-right-arrow": ArrowRight,
  "navigation-up-arrow": ArrowUp,
  "official-service": Landmark,
  overview: LayoutGrid,
  "overview-chart": PieChart,
  "paper-plane": Send,
  performance: Gauge,
  phone: Phone,
  play: Play,
  privacy: ShieldCheck,
  resize: Maximize2,
  search: Search,
  shield: Shield,
  "slim-arrow-down": ChevronDown,
  "status-negative": XCircle,
  "study-leave": GraduationCap,
  suitcase: Briefcase,
  "target-group": Target,
  "trend-up": TrendingUp,
  trophy: Trophy,
  up: ChevronUp,
  warning: AlertTriangle,
  warning2: AlertTriangle,
  "workflow-tasks": Workflow,
  world: Globe,
  "write-new-document": PenSquare,
};

export interface IconProps {
  /** Semantic icon name, e.g. "calculator", "shield", "money-bills" */
  name: string;
  /** Pixel size (width and height). Defaults to 1em so it follows font size. */
  size?: number | string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = "1em", color, className = "", style }: Readonly<IconProps>) {
  const Component = ICONS[name] ?? FileText;
  return (
    <Component
      aria-hidden="true"
      width={size}
      height={size}
      strokeWidth={1.75}
      className={`inline-block shrink-0 ${className}`}
      style={{ color, ...style }}
    />
  );
}

export default Icon;
