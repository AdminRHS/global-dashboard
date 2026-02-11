/**
 * Loading Spinner Component
 * Displays animated loading indicator
 */

import './LoadingSpinner.module.css';

function LoadingSpinner({ size = 'md', message = 'Loading...' }) {
  const sizeMap = {
    sm: '24px',
    md: '48px',
    lg: '64px',
  };

  return (
    <div className="loading-spinner-container" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
      <div
        className="spinner"
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `4px solid var(--border-color)`,
          borderTop: `4px solid var(--color-primary)`,
          borderRadius: 'var(--radius-full)',
          animation: 'spin 1s linear infinite',
          margin: '0 auto',
        }}
      />
      {message && (
        <p style={{
          marginTop: 'var(--spacing-md)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-sm)',
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
