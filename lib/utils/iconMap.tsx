import * as React from "react";
import {
  type LucideIcon,
  BookOpen,
  BookMarked,
  Book,
  Camera,
  CreditCard,
  Plane,
  Building2,
  Users,
  FileText,
  Home,
  IdCard,
  Shield,
  Banknote,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Globe,
  FileBadge,
  ScanLine,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  BookMarked,
  Book,
  Camera,
  CreditCard,
  Plane,
  Building2,
  Users,
  FileText,
  Home,
  IdCard,
  Shield,
  Banknote,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Globe,
  FileBadge,
  ScanLine,
  MapPin,
  Phone,
  Mail,
  Clock,
};

export const getIcon = (name: string, size = 24, className = "") => {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
};

