import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-2.5 text-sm font-semibold tracking-[0.12em] text-accent uppercase",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden="true"
            className="h-px w-8 rounded-full bg-accent/60"
          />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
