import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const icons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
} as const;

/**
 * Social links from central config. Links with `href: null` (not yet
 * provided) are simply not rendered — never a broken link.
 */
export function SocialLinks({ className }: { className?: string }) {
  const available = site.social.filter((s) => s.href);

  if (available.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {available.map((social) => {
        const Icon = icons[social.platform];
        return (
          <li key={social.platform}>
            <a
              href={social.href as string}
              {...(social.href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={social.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-ink"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
