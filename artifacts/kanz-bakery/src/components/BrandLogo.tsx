import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';

/** The bread-loaf SVG mark used as the Kanz Bakery icon. */
export function BreadMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="32" cy="40" rx="24" ry="12" opacity="0.3" />
      <path d="M10 36 Q12 20 32 18 Q52 20 54 36 Q52 44 32 46 Q12 44 10 36Z" />
      <path
        d="M18 28 Q20 18 32 16 Q44 18 46 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.6"
      />
      <path
        d="M22 24 Q24 15 32 14 Q40 15 42 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}

interface BrandLogoProps {
  /** Wrap the logo in a <Link href="/"> */
  linked?: boolean;
  className?: string;
}

/** Full Kanz Bakery logo: bread mark + wordmark. */
export function BrandLogo({ linked = true, className = '' }: BrandLogoProps) {
  const { t } = useTranslation();

  const inner = (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/15">
        <BreadMark className="w-5 h-5 text-primary" />
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
