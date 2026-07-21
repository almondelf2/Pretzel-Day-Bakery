import { Link } from 'wouter';

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

/**
 * Full Pretzel Day Bakery logo styled after The Office door sign:
 * black badge · stacked "The / Pretzel / Bakery" text · bordered pretzel icon.
 */
export function BrandLogo({ linked = true, className = '' }: BrandLogoProps) {
  const inner = (
    <span
      className={`inline-flex items-stretch bg-neutral-900 rounded-md overflow-hidden shadow-sm select-none ${className}`}
      aria-label="Pretzel Day Bakery — home"
    >
      {/* Left: stacked wordmark */}
      <span className="flex flex-col justify-center px-3 py-2 gap-0">
        <span className="text-white/50 font-sans text-[8px] leading-none tracking-[0.2em] uppercase">
          The
        </span>
        <span className="text-white font-sans font-bold text-[14px] leading-tight tracking-tight">
          Pretzel
        </span>
        <span className="text-white font-sans font-bold text-[14px] leading-tight tracking-tight">
          Bakery
        </span>
      </span>

      {/* Right: white-bordered box with pretzel replacing the people */}
      <span className="flex items-center justify-center px-2.5 py-2">
        <span className="border border-white/60 rounded-sm p-1.5 flex items-center justify-center">
          <PretzelMark className="w-6 h-6 text-white" />
        </span>
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
