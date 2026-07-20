import Image from "next/image";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Professional portrait area.
 *
 * Until an approved portrait exists at public/images/portrait.jpg (then set
 * `portraitSrc` below), this renders a dignified monogram placeholder —
 * never a stock photo of a random person.
 */
// TODO(Sedjro): add approved portrait at public/images/portrait.jpg and set this to "/images/portrait.jpg".
const portraitSrc: string | null = null;

export function PortraitFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface-2",
        className,
      )}
    >
      {portraitSrc ? (
        <Image
          src={portraitSrc}
          alt={`Portrait of ${site.name}`}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 40vw, 80vw"
          className="object-cover"
          priority
        />
      ) : (
        <div
          role="img"
          aria-label={`${site.name} — portrait coming soon`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 hero-glow"
        >
          <span
            aria-hidden="true"
            className="flex size-24 items-center justify-center rounded-full bg-accent font-display text-3xl font-bold text-white dark:text-[#0a1120]"
          >
            {site.initials}
          </span>
          <div className="text-center">
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
