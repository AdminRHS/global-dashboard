/**
 * Dashboard Detail Page
 * Displays detailed statistics and data for a specific dashboard
 */

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dashboards } from '../config/dashboards.js';
import { useYellowCardData, useAttendanceData } from '../hooks/useDashboardData.js';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';

function DashboardDetail() {
  const { dashboardId } = useParams();
  const navigate = useNavigate();
  const dashboard = dashboards.find((d) => d.id === dashboardId);

  // Memoize options to prevent infinite loop
  const yellowCardOptions = useMemo(() => ({
    lazy: dashboardId !== 'yellow-card',
  }), [dashboardId]);

  const attendanceOptions = useMemo(() => ({
    lazy: dashboardId !== 'hr-attendance',
  }), [dashboardId]);

  // Fetch Yellow Card data if applicable
  const { data: yellowCardData, loading: yellowCardLoading, error: yellowCardError } = useYellowCardData(yellowCardOptions);

  // Fetch HR Attendance data if applicable
  const { data: attendanceData, loading: attendanceLoading, error: attendanceError } = useAttendanceData(attendanceOptions);

  if (!dashboard) {
    return (
      <div>
        <Header />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
            <h2>Dashboard Not Found</h2>
            <p>The requested dashboard does not exist.</p>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: 'var(--button-padding-y) var(--button-padding-x)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--button-radius)',
                cursor: 'pointer',
                marginTop: 'var(--spacing-md)',
              }}
            >
              Back to Homepage
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-detail">
      <Header />

      <main className="main-content">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            padding: 'var(--spacing-sm) var(--spacing-md)',
            backgroundColor: 'transparent',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--button-radius)',
            cursor: 'pointer',
            marginBottom: 'var(--spacing-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
            color: 'var(--text-primary)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--font-size-base)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            e.currentTarget.style.borderColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'var(--border-color)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <span style={{ fontSize: '1.2em' }}>←</span>
          <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Back to All Dashboards</span>
        </button>

        {/* Dashboard Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              width: '96px',
              height: '96px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `${dashboard.color}20`,
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {dashboard.icon}
          </div>

          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontSize: 'var(--font-size-4xl)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              {dashboard.name}
            </h1>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              {dashboard.description}
            </p>

            {/* External Link */}
            <a
              href={dashboard.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-lg)',
                backgroundColor: 'var(--color-primary)',
                color: '#FFFFFF',
                borderRadius: 'var(--button-radius)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--font-size-base)',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Open Dashboard</span>
              <span style={{ fontSize: '1.2em' }}>→</span>
            </a>
          </div>
        </div>

        {/* API Data Section - Yellow Card */}
        {dashboard.hasAPI && dashboardId === 'yellow-card' && (
          <div>
            <h2
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              Live Statistics
            </h2>

            {yellowCardLoading && <LoadingSpinner message="Loading Yellow Card data..." />}

            {yellowCardError && (
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--color-danger)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-danger)',
                }}
              >
                <h3>Error Loading Data</h3>
                <p>{yellowCardError}</p>
              </div>
            )}

            {yellowCardData && !yellowCardLoading && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-lg)',
                }}
              >
                <StatCard
                  label="Total Employees"
                  value={yellowCardData.stats.totalEmployees}
                  icon="👥"
                  color="#2196F3"
                />
                <StatCard
                  label="Total Violations"
                  value={yellowCardData.stats.totalViolations}
                  icon="🟡"
                  color="#FFC107"
                />
                <StatCard
                  label="Total Green Cards"
                  value={yellowCardData.stats.totalGreenCards}
                  icon="🟢"
                  color="#4CAF50"
                />
                <StatCard
                  label="Employees with Violations"
                  value={yellowCardData.stats.employeesWithViolations}
                  icon="⚠️"
                  color="#FF9800"
                />
              </div>
            )}
          </div>
        )}

        {/* API Data Section - HR Attendance */}
        {dashboard.hasAPI && dashboardId === 'hr-attendance' && (
          <div>
            <h2
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              Live Statistics
            </h2>

            {attendanceLoading && <LoadingSpinner message="Loading HR Attendance data..." />}

            {attendanceError && (
              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--color-danger)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-danger)',
                }}
              >
                <h3>Error Loading Data</h3>
                <p>{attendanceError}</p>
              </div>
            )}

            {attendanceData && !attendanceLoading && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 'var(--spacing-lg)',
                }}
              >
                <StatCard
                  label="Total Employees"
                  value={attendanceData.stats.totalEmployees}
                  icon="👥"
                  color="#2196F3"
                />
                <StatCard
                  label="On Time Today"
                  value={attendanceData.stats.onTime}
                  icon="✅"
                  color="#4CAF50"
                />
                <StatCard
                  label="Late Today"
                  value={attendanceData.stats.late}
                  icon="⏰"
                  color="#FF9800"
                />
                <StatCard
                  label="Absent Today"
                  value={attendanceData.stats.absent}
                  icon="❌"
                  color="#F44336"
                />
                <StatCard
                  label="Punctuality Rate"
                  value={`${attendanceData.stats.averagePunctualityRate}%`}
                  icon="📊"
                  color="#9C27B0"
                />
                <StatCard
                  label="Total Departments"
                  value={attendanceData.stats.totalDepartments}
                  icon="🏢"
                  color="#00BCD4"
                />
              </div>
            )}

            {attendanceData && !attendanceLoading && attendanceData.stats.latestDate && (
              <p
                style={{
                  marginTop: 'var(--spacing-md)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                }}
              >
                Latest data: {attendanceData.stats.latestDate}
              </p>
            )}
          </div>
        )}

        {/* No API Message */}
        {!dashboard.hasAPI && (
          <div
            style={{
              padding: 'var(--spacing-xl)',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>
              This dashboard does not have API integration yet. Click "Open Dashboard" to view it directly.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div
      style={{
        padding: 'var(--spacing-lg)',
        backgroundColor: 'var(--bg-primary)',
        border: `2px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-sm)' }}>{icon}</div>
      <div
        style={{
          fontSize: 'var(--font-size-3xl)',
          fontWeight: 'var(--font-weight-bold)',
          color,
          marginBottom: 'var(--spacing-xs)',
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

export default DashboardDetail;
