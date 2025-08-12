import { ShineBorder } from "../UI/shine-border";

export function SectionTitleCapsule({
    children,
    highlight,
    align = "center",
    caseInsensitive = false,
  }: {
    children: React.ReactNode;
    highlight?: string;
    align?: "left" | "center";
    caseInsensitive?: boolean;
  }) {
    const base =
      "font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-foreground";
    const alignClass = align === "center" ? "text-center" : "text-left";
  
    if (typeof children !== "string" || !highlight || highlight.length === 0) {
      return <h1 className={`${base} ${alignClass}`}>{children}</h1>;
    }
  
    const source = children;
    const needle = caseInsensitive ? highlight.toLowerCase() : highlight;
    const haystack = caseInsensitive ? source.toLowerCase() : source;
  
    // If not found, render as-is
    if (!haystack.includes(needle)) {
      return <h1 className={`${base} ${alignClass}`}>{children}</h1>;
    }
  
    // Split and interleave with highlighted spans
    const parts: React.ReactNode[] = [];
    let start = 0;
    const i=1;
    while (i>0) {
      const idx = haystack.indexOf(needle, start);
      if (idx === -1) {
        parts.push(source.slice(start));
        break;
      }
      // push text before match
      if (idx > start) {
        parts.push(source.slice(start, idx));
      }
      // actual matched text with original casing
      const match = source.slice(idx, idx + highlight.length);
      parts.push(
        <span
          key={`h-${idx}`}
          className="relative mx-1 inline-flex items-center rounded-full px-3 py-1
            bg-[color-mix(in_oklab,var(--primary)_10%,_transparent)]
            text-primary overflow-hidden"
        >
          <ShineBorder 
            shineColor="var(--primary)"
            className="rounded-full"
            borderWidth={1}
            duration={8}
          />
          <span className="relative z-10">{match}</span>
        </span>
      );
      start = idx + highlight.length;
    }
  
    return <h1 className={`${base} ${alignClass}`}>{parts}</h1>;
  }
  