import { Zap, Paintbrush, Layers } from "lucide-react"; // swap icons if you prefer
import { SectionTitleCapsule } from "./section-title";
// You can replace lucide icons with your own icon set if available.

export function WhyIgnixSection() {
    return (
        <section
            aria-labelledby="why-ignix-title"
            className="relative w-full py-16 md:py-24 px-5"
        >
            {/* Background accent */}
            <div
                className="
          pointer-events-none absolute inset-0 -z-10
          bg-[radial-gradient(900px_500px_at_15%_0%,_color-mix(in_oklab,_hsl(var(--primary))_10%,_transparent),_transparent_60%),
              radial-gradient(900px_520px_at_85%_10%,_color-mix(in_oklab,_hsl(var(--secondary))_10%,_transparent),_transparent_60%)]
          opacity-60
        "
            />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
                    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]" />
                        Why developers love Ignix UI
                    </p>
                    <SectionTitleCapsule
                        highlight="developers"
                    >
                        Built by developers, for developers
                    </SectionTitleCapsule>
                    <p className="mt-4 text-base md:text-lg text-muted-foreground">
                        Every component is crafted with performance, accessibility, and developer experience in mind.
                    </p>
                </header>

                {/* Grid */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <FeatureCard
                        icon={<Zap className="h-5 w-5 text-[hsl(var(--primary))]" />}
                        title="100+ Components"
                        desc="From basic buttons to complex data tables. Every component you need to build modern applications, with infinite customization possibilities."
                    />

                    <FeatureCard
                        icon={<Paintbrush className="h-5 w-5 text-[hsl(var(--primary))]" />}
                        title="Custom Theming"
                        desc="Fully themeable components that adapt to your brand. No design debt, just beautiful UIs that scale with your vision."
                    />

                    <FeatureCard
                        icon={<Layers className="h-5 w-5 text-[hsl(var(--primary))]" />}
                        title="Domain-Specific Kits"
                        desc="Specialized component kits for healthcare, fintech, and more. Launch faster with industry-specific UI patterns."
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div
            className="
        group relative rounded-2xl border border-border/60 bg-background/60 backdrop-blur
        p-5 md:p-6
        shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]
        transition-shadow
        mx-auto
      "
        >
            <div className="flex items-center gap-2">
                <div
                    className="
            inline-flex h-9 w-9 items-center justify-center rounded-full
            bg-[color-mix(in_oklab,_hsl(var(--primary))_12%,_transparent)]
            ring-1 ring-[color-mix(in_oklab,_hsl(var(--primary))_35%,_transparent)]
          "
                >
                    {icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground">{title}</h3>
            </div>

            <p className="mt-3 text-sm md:text-[15px] leading-relaxed text-muted-foreground">
                {desc}
            </p>
            {/* subtle hover glow */}
            <div
                className="
          pointer-events-none absolute -inset-1 rounded-[18px] opacity-0
          group-hover:opacity-100 transition
          bg-[radial-gradient(500px_200px_at_50%_0%,_color-mix(in_oklab,_hsl(var(--primary))_18%,_transparent),_transparent_60%)]
          blur-[14px]
        "
            />
        </div>
    );
}
