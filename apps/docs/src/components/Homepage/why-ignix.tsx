import { Zap, Paintbrush, Layers, ArrowUpRight } from "lucide-react";
import { SectionTitleCapsule } from "./section-title";
import Link from "@docusaurus/Link";

export function WhyIgnixSection() {
    return (
        <section
            aria-labelledby="why-ignix-title"
            style={{
                position: 'relative',
                width: '100%',
                paddingTop: '4rem',
                paddingBottom: '4rem',
                paddingLeft: '1.25rem',
                paddingRight: '1.25rem'
            }}
        >
            {/* Enhanced Background with mesh gradient */}
            <div
                style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    zIndex: -1,
                    background: `
                        radial-gradient(800px 400px at 20% 10%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 65%),
                        radial-gradient(900px 450px at 80% 15%, color-mix(in oklab, var(--secondary) 12%, transparent), transparent 65%),
                        radial-gradient(600px 300px at 50% 90%, color-mix(in oklab, var(--muted) 10%, transparent), transparent 70%)
                    `,
                    opacity: 0.7
                }}
            />
            
            {/* Animated floating elements */}
            <div
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    opacity: 0.4,
                    animation: 'float1 6s ease-in-out infinite'
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '8%',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--secondary)',
                    opacity: 0.3,
                    animation: 'float2 8s ease-in-out infinite'
                }}
            />

            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                {/* Enhanced Header */}
                <header style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 3.5rem auto' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.75rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--muted-foreground)',
                            marginBottom: '1rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '9999px',
                            background: 'color-mix(in oklab, var(--primary) 8%, transparent)',
                            border: '1px solid color-mix(in oklab, var(--primary) 15%, transparent)'
                        }}
                    >
                        <span
                            style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                animation: 'pulse 2s infinite'
                            }}
                        />
                        Why developers love Ignix UI
                    </div>
                    
                    <SectionTitleCapsule highlight="developers">
                        Built by developers, for developers
                    </SectionTitleCapsule>
                    
                    <p
                        style={{
                            marginTop: '1.5rem',
                            fontSize: '1.125rem',
                            lineHeight: '1.75rem',
                            color: 'var(--muted-foreground)',
                            maxWidth: '600px',
                            margin: '1.5rem auto 0'
                        }}
                    >
                        Every component is crafted with performance, accessibility, and developer experience in mind.
                    </p>
                </header>

                {/* Enhanced Grid with better spacing and hover effects */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}
                >
                    <FeatureCard
                        icon={<Zap style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />}
                        title="100+ Components"
                        desc="From basic buttons to complex data tables. Every component you need to build modern applications, with infinite customization possibilities."
                        gradient="linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent)"
                    />

                    <FeatureCard
                        icon={<Paintbrush style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />}
                        title="Custom Theming"
                        desc="Fully themeable components that adapt to your brand. No design debt, just beautiful UIs that scale with your vision."
                        gradient="linear-gradient(135deg, color-mix(in oklab, var(--secondary) 8%, transparent), transparent)"
                    />

                    <FeatureCard
                        icon={<Layers style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />}
                        title="Domain-Specific Kits"
                        desc="Specialized component kits for healthcare, fintech, and more. Launch faster with industry-specific UI patterns."
                        gradient="linear-gradient(135deg, color-mix(in oklab, var(--muted) 8%, transparent), transparent)"
                    />
                </div>

                {/* Call to Action */}
                <Link to="/docs/introduction">
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <button
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.75rem 2rem',
                            borderRadius: '9999px',
                            background: 'linear-gradient(90deg, var(--primary), color-mix(in oklab, var(--primary) 70%, transparent))',
                            color: '#fff',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 20px color-mix(in oklab, var(--primary) 25%, transparent)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 30px color-mix(in oklab, var(--primary) 35%, transparent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px color-mix(in oklab, var(--primary) 25%, transparent)';
                        }}
                    >
                        Explore Components
                        <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                    </button>
                </div>
                </Link>
            </div>

            <style>{`
                @keyframes float1 {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-180deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
                @media (prefers-reduced-motion: reduce) {
                    * { animation: none !important; }
                }
            `}</style>
        </section>
    );
}

function FeatureCard({
    icon,
    title,
    desc,
    gradient
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    gradient: string;
}) {
    return (
        <div
            style={{
                position: 'relative',
                borderRadius: '1.5rem',
                border: '1px solid color-mix(in oklab, var(--foreground) 8%, transparent)',
                background: 'color-mix(in oklab, var(--background) 95%, transparent)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--primary) 25%, transparent)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--foreground) 8%, transparent)';
            }}
        >
            {/* Background gradient overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: gradient,
                    opacity: 0.6,
                    pointerEvents: 'none'
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            width: '48px',
                            height: '48px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: 'color-mix(in oklab, var(--primary) 12%, transparent)',
                            border: '2px solid color-mix(in oklab, var(--primary) 25%, transparent)'
                        }}
                    >
                        {icon}
                    </div>
                    <h3
                        style={{
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: 'var(--foreground)',
                            margin: 0
                        }}
                    >
                        {title}
                    </h3>
                </div>

                <p
                    style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: 'var(--muted-foreground)',
                        margin: '0 0 1.5rem 0'
                    }}
                >
                    {desc}
                </p>

                {/* Bottom accent line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, var(--primary), transparent)',
                        borderRadius: '0 0 1.5rem 1.5rem'
                    }}
                />
            </div>

            {/* Hover glow effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '1.5rem',
                    opacity: 0,
                    pointerEvents: 'none',
                    background: 'radial-gradient(600px 300px at 50% 0%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%)',
                    filter: 'blur(20px)',
                    transition: 'opacity 0.4s ease'
                }}
                className="hover-glow"
            />
        </div>
    );
}
