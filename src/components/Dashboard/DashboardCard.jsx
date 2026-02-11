/**
 * Dashboard Card Component
 * Displays a single dashboard as a card with icon, name, description, and link
 */

import './DashboardCard.module.css';

function DashboardCard({ dashboard, onClick }) {
  const {
    id,
    name,
    description,
    icon,
    color,
    status,
    hasAPI,
    features = [],
    tags = [],
  } = dashboard;

  return (
    <div
      className="dashboard-card"
      onClick={onClick}
      style={{
        padding: 'var(--card-padding)',
        backgroundColor: 'var(--card-bg)',
        border: `1px solid var(--card-border)`,
        borderRadius: 'var(--card-radius)',
        boxShadow: 'var(--card-shadow)',
        cursor: 'pointer',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
        e.currentTarget.style.borderColor = 'var(--card-border)';
      }}
    >
      {/* Header: Icon + Status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            fontSize: '48px',
            width: '64px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${color}20`,
            borderRadius: 'var(--radius-lg)',
          }}
        >
          {icon}
        </div>

        {status && (
          <span
            style={{
              padding: '4px 8px',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              borderRadius: 'var(--radius-full)',
              backgroundColor: status === 'active' ? 'var(--color-success-light)' : 'var(--color-gray-300)',
              color: status === 'active' ? 'var(--color-success-dark)' : 'var(--text-secondary)',
            }}
          >
            {status}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--line-height-normal)',
          margin: 0,
          flexGrow: 1,
        }}
      >
        {description}
      </p>

      {/* Features & Tags */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {/* Features */}
        {features.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
            {features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                style={{
                  padding: '2px 8px',
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '2px 8px',
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: `${color}20`,
                  color,
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: API Badge */}
      {hasAPI && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            padding: 'var(--spacing-sm)',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-tertiary)',
          }}
        >
          <span>🔌</span>
          <span>Live API Data</span>
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
