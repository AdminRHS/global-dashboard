/**
 * Dashboard Grid Component
 * Displays a grid of dashboard cards
 */

import DashboardCard from './DashboardCard.jsx';

function DashboardGrid({ dashboards, onCardClick }) {
  return (
    <div
      className="dashboard-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 'var(--dashboard-grid-gap)',
        width: '100%',
      }}
    >
      {dashboards.map((dashboard) => (
        <DashboardCard
          key={dashboard.id}
          dashboard={dashboard}
          onClick={() => onCardClick(dashboard)}
        />
      ))}
    </div>
  );
}

export default DashboardGrid;
