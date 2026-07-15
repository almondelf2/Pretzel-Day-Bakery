import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

/** Pretzel SVG mark — the Pretzel Day Bakery icon. */
export function PretzelMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/*
        Three-path pretzel construction (100×100 viewBox):

        Body junctions (top of the bottom oval):
          Left = (28, 60)   Right = (72, 60)

        Each arm starts at one body junction, loops around its hole,
        then lands on the OPPOSITE side of the knot — that crossing is
        the signature pretzel X, visible at ≈ (50, 30).

        Knot endpoints:
          Left arm ends  → right side of knot (62, 46)
          Right arm ends → left  side of knot (38, 46)

        Three holes created:
          • Left hole  — enclosed by the left-arm loop
          • Right hole — enclosed by the right-arm loop
          • Middle hole — framed by the two arms above and the oval below
      */}

      {/* Bottom oval body */}
      <path d="M28,60 C12,60 6,72 6,82 C6,92 24,97 50,97 C76,97 94,92 94,82 C94,72 88,60 72,60" />

      {/* Left arm — goes under at the knot crossing */}
      <path d="M28,60 C14,58 6,48 6,34 C6,20 14,12 24,12 C34,12 46,22 62,46" />

      {/* Crossing gap — white blocker so left arm reads as going under */}
      <path d="M44,26 C46,28 50,31 56,34" stroke="white" strokeWidth="16" strokeLinecap="round" />

      {/* Right arm — goes over at the knot crossing */}
      <path d="M72,60 C86,58 94,48 94,34 C94,20 86,12 76,12 C66,12 54,22 38,46" />
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
