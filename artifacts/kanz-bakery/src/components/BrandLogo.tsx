import { Link } from 'wouter';

/** Pretzel SVG mark — the Pretzel Day Bakery icon. */
export function PretzelMark({
  className = 'w-7 h-7',
  gapColor = 'white',
}: {
  className?: string;
  /** Color of the crossing-gap blocker — should match the background behind the icon. */
  gapColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Bottom U / oval connecting the two arms */}
      <path d="M30,63 C12,63 5,74 5,84 C5,94 22,98 50,98 C78,98 95,94 95,84 C95,74 88,63 70,63" />

      {/* Left arm — loops up and around the left hole, ends at right side of knot */}
      <path d="M30,63 C14,61 5,50 5,36 C5,20 15,8 28,8 C41,8 52,20 64,44" />

      {/* Gap blocker — hides left arm so it reads as going under */}
      <path d="M47,29 C49,32 52,36 57,41" stroke={gapColor} strokeWidth="11" strokeLinecap="round" />

      {/* Right arm — loops up and around the right hole, goes over, ends at left side of knot */}
      <path d="M70,63 C86,61 95,50 95,36 C95,20 85,8 72,8 C59,8 48,20 36,44" />
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
        <span className="border border-white/60 rounded-sm w-9 h-9 flex items-center justify-center" style={{ fontSize: '22px', lineHeight: 1 }}>
          🥨
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
