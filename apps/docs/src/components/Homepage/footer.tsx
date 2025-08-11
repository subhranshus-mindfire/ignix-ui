import Link from "@docusaurus/Link";
import { Github } from "lucide-react";

const Footer = () => (
  <footer
    style={{
      position: 'relative',
      width: '100%',
      height: '64px',
      zIndex: 50,
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: '1200px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '0 1rem',
        color: 'var(--muted-foreground)',
        fontSize: '0.875rem',
      }}
    >
      {/* Left: copyright */}
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Mindfire Solutions Digital LLP FOSS
      </p>

      {/* Right: GitHub actions */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* GitHub repo icon button */}
        <Link
          to="https://github.com/mindfiredigital/ignix-ui"
          aria-label="Open GitHub repository"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '34px',
            height: '34px',
            borderRadius: '9999px',
            border: '1px solid var(--foreground)',
            background: 'var(--background)',
            color: 'var(--foreground)',
            textDecoration: 'none',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.background = 'color-mix(in oklab, var(--primary) 6%, transparent)';
            e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--primary) 28%, transparent)';
            e.currentTarget.style.boxShadow = '0 8px 24px color-mix(in oklab, var(--primary) 24%, transparent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.background = 'color-mix(in oklab, var(--background) 85%, transparent)';
            e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--foreground) 10%, transparent)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Github size={16} />
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
