const PATHS = {
  "up-right": ["M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5", "M3.5 8.5L5.5 6.5"],
  right: ["M2 6H10M10 6L7 3M10 6L7 9", "M2 6H6"],
  left: ["M10 6H2M2 6L5 3M2 6L5 9", "M10 6H6"],
} as const;

type ArrowProps = {
  direction: keyof typeof PATHS;
  size?: number;
  className?: string;
};

export function Arrow({ direction, size = 10, className }: ArrowProps) {
  const [line, tail] = PATHS[direction];

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={line} />
      <path d={tail} opacity="0.3" />
    </svg>
  );
}
