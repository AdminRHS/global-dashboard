/**
 * Header Component
 * Top navigation bar with logo, title, and theme toggle
 */

import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../Common/ThemeToggle.jsx';

function Header() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--header-bg)',
        borderBottom: `1px solid var(--header-border)`,
        boxShadow: 'var(--header-shadow)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Left: Logo + Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          {/* Logo */}
          <div
            style={{
              fontSize: '32px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            📊
          </div>

          {/* Title */}
          <div>
            <h1
              style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Global Dashboard
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-tertiary)',
                margin: 0,
              }}
            >
              Unified monitoring and analytics platform
            </p>
          </div>
        </div>

        {/* Right: Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
