import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

/** Pretzel SVG mark — the Pretzel Day Bakery icon. */
export function PretzelMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/*
        Pretzel anatomy:
        - Knot: two pairs of endpoints near the center
            lower-left (26,36), lower-right (38,36)
            upper-right (38,24), upper-left (26,24)
        - Left arm: starts lower-left, loops around the left hole, arrives upper-right
        - Right arm: starts lower-right, loops around the right hole, arrives upper-left
          The arms cross each other at the knot (~32,30), which is the signature pretzel X.
        - Bottom U: two half-curves from the knot base down to (32,58).
      */}

      {/* Left arm — loops around left hole, crosses to the right */}
      <path d="M26,36 C8,36 4,8 18,5 C28,4 40,16 38,24" />

      {/* Right arm — loops around right hole, crosses to the left */}
      <path d="M38,36 C56,36 60,8 46,5 C36,4 24,16 26,24" />

      {/* Bottom U — left half */}
      <path d="M26,36 C12,40 8,54 32,58" />

      {/* Bottom U — right half */}
      <path d="M38,36 C52,40 56,54 32,58" />
    </svg>
  );
}

// Keep BreadMark as alias so the homepage hero still works
export { PretzelMark as BreadMark };

interface BrandLogoProps {
  /** Wrap the logo in a <Link href="/"> */
  linked?: boolean;
  className?: string;
}

/** Full Pretzel Day Bakery logo: pretzel mark + wordmark. */
export function BrandLogo({ linked = true, className = '' }: BrandLogoProps) {
  const { t } = useTranslation();

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
        <PretzelMark className="w-5 h-5 text-primary" />
      </span>
      <span className="font-serif font-bold text-xl tracking-tight text-foreground">
        {t('nav.brand')}
      </span>
    </span>
  );

  if (!linked) return inner;

  return (
    <Link
      href="/"
      className="hover:opacity-80 transition-opacity shrink-0"
      data-testid="link-home"
    >
      {inner}
    </Link>
  );
}
