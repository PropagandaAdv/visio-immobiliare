type LogoProps = {
  className?: string;
  variant?: "color" | "white" | "dark";
  withWordmark?: boolean;
};

const palette: Record<NonNullable<LogoProps["variant"]>, { teal: string; gold: string; sage: string; text: string; sub: string }> = {
  color: { teal: "#1E4E5B", gold: "#C5A059", sage: "#829F92", text: "#12242B", sub: "#5B6B70" },
  white: { teal: "#FFFFFF", gold: "#D7BA85", sage: "#C7D6CC", text: "#FFFFFF", sub: "rgba(255,255,255,0.7)" },
  dark: { teal: "#12242B", gold: "#C5A059", sage: "#829F92", text: "#12242B", sub: "#5B6B70" },
};

export function Logo({ className = "", variant = "color", withWordmark = true }: LogoProps) {
  const c = palette[variant];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20 5L34 30H6L20 5Z"
          stroke={c.teal}
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <path
          d="M23 17L31.5 30H14.5L23 17Z"
          fill={c.gold}
        />
        <path
          d="M14.5 30H6L12 19.8L14.5 30Z"
          fill={c.sage}
          opacity="0.9"
        />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className="font-display font-bold tracking-tight text-[1.2rem]"
            style={{ color: c.text }}
          >
            VISIO
          </span>
          <span
            className="font-display font-medium text-[0.58rem] tracking-[0.28em]"
            style={{ color: c.sub }}
          >
            IMMOBILIARE
          </span>
        </span>
      )}
    </span>
  );
}
