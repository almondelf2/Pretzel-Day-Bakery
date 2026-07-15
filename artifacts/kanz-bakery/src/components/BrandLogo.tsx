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
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Bottom-left side of body */}
      <path d="M20 50 Q8 50 8 38 Q8 26 20 24" />
      {/* Bottom-right side of body */}
      <path d="M44 50 Q56 50 56 38 Q56 26 44 24" />
      {/* Bottom arc connecting the two sides */}
      <path d="M20 50 Q32 58 44 50" />
      {/* Center cross where the arms meet */}
      <path d="M20 24 Q26 32 32 32 Q38 32 44 24" />
      {/* Left upper loop */}
      <path d="M20 24 Q14 12 22 8 Q28 4 32 14" />
      {/* Right upper loop */}
      <path d="M44 24 Q50 12 42 8 Q36 4 32 14" />
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
