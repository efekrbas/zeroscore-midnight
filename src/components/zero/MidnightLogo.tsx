export function MidnightLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <rect x="10.5" y="5" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="10.5" y="9.5" width="3" height="3" fill="currentColor" stroke="none" />
      <rect x="10.5" y="14" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  );
}
