/**
 * Homepage Component
 * Displays grid of all available dashboards
 */

import { useNavigate } from 'react-router-dom';
import { dashboards } from '../config/dashboards.js';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import DashboardGrid from '../components/Dashboard/DashboardGrid.jsx';

function Homepage() {
  const navigate = useNavigate();

  const handleCardClick = (dashboard) => {
    navigate(`/dashboard/${dashboard.id}`);
  };

  return (
    <div className="homepage">
      <Header />

      <main className="main-content">
        {/* Page Header */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <h2
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            All Dashboards
          </h2>
          <p
            style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--text-secondary)',
            }}
          >
            Select a dashboard to view detailed analytics and statistics
          </p>
        </div>

        {/* Dashboard Grid */}
        <DashboardGrid dashboards={dashboards} onCardClick={handleCardClick} />
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
