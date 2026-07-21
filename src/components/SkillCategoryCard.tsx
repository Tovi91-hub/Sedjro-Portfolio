import {
  Cloud,
  CreditCard,
  Database,
  LayoutDashboard,
  Server,
  Shield,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { SkillCategory } from "@/types/portfolio";
import { TechBadge } from "@/components/TechBadge";

const iconMap: Record<string, LucideIcon> = {
  layout: LayoutDashboard,
  server: Server,
  database: Database,
  cloud: Cloud,
  "credit-card": CreditCard,
  shield: Shield,
  wrench: Wrench,
  users: Users,
};

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.icon] ?? LayoutDashboard;

  return (
    <div className="flex h-full card-lift flex-col gap-3 rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
        <h3 className="font-display text-base font-semibold">
          {category.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted">{category.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <TechBadge>{skill.name}</TechBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}
