/**
 * Footer Component
 * Bottom section with copyright, links, and info
 */

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--footer-bg)',
        borderTop: `1px solid var(--footer-border)`,
        padding: 'var(--spacing-lg)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)',
        }}
      >
        {/* Top: Links */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-lg)',
            justifyContent: 'center',
            paddingBottom: 'var(--spacing-md)',
            borderBottom: `1px solid var(--border-color)`,
          }}
        >
          <FooterLink href="https://yc.anyemp.com" label="Yellow Card" />
          <FooterLink href="https://attendance.anyemp.com" label="HR Attendance" />
          <FooterLink href="https://anyemp.com" label="AnyEmp" />
          <FooterLink href="https://sync.rh-s.com" label="Sync Dashboard" />
          <FooterLink href="https://onb.anyemp.com" label="Onboarding" />
        </div>

        {/* Bottom: Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--text-tertiary)',
          }}
        >
          <p style={{ margin: 0 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Global Dashboard</strong> — Unified
            monitoring and analytics platform
          </p>
          <p style={{ margin: 0 }}>
            © {currentYear} AnyEmp. Built with React + Vite + Zustand
          </p>
          <p style={{ margin: 0, fontSize: 'var(--font-size-xs)' }}>
            Version 1.0.0 • Last updated: Feb 11, 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: 'var(--font-size-sm)',
        transition: 'color var(--transition-fast)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {label}
    </a>
  );
}

export default Footer;
