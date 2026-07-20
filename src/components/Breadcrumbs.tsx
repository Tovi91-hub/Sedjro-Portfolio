import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-faint">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              {i > 0 && (
                <ChevronRight
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              <li>
                {isLast ? (
                  <span aria-current="page" className="font-medium text-muted">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="transition-colors hover:text-ink"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
