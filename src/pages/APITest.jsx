/**
 * API Test Page
 * Tests Yellow Card API integration and displays raw data
 */

import { useYellowCardData } from '../hooks/useDashboardData.js';

function APITest() {
  const { data, loading, error, refetch } = useYellowCardData();

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h1>🧪 API Test — Yellow Card Dashboard</h1>

      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={refetch}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1976D2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ padding: '16px', backgroundColor: '#E3F2FD', borderRadius: '8px' }}>
          <p>⏳ Loading Yellow Card data...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#FFEBEE',
          borderRadius: '8px',
          color: '#C62828',
        }}>
          <h3>❌ Error</h3>
          <p>{error}</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            <strong>Troubleshooting:</strong>
          </p>
          <ul style={{ fontSize: '14px' }}>
            <li>Check that Vite proxy is configured correctly</li>
            <li>Verify Yellow Card API is accessible at https://yc.anyemp.com/api</li>
            <li>Check browser console for CORS errors</li>
          </ul>
        </div>
      )}

      {/* Success State */}
      {data && !loading && (
        <div>
          <div style={{
            padding: '16px',
            backgroundColor: '#E8F5E9',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            <h3>✅ API Connected Successfully</h3>
            <p style={{ fontSize: '14px', color: '#2E7D32' }}>
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </p>
          </div>

          {/* Statistics */}
          <div style={{ marginBottom: '24px' }}>
            <h2>📊 Statistics</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}>
              <StatCard
                label="Total Employees"
                value={data.stats.totalEmployees}
                icon="👥"
                color="#2196F3"
              />
              <StatCard
                label="Total Violations"
                value={data.stats.totalViolations}
                icon="🟡"
                color="#FFC107"
              />
              <StatCard
                label="Total Green Cards"
                value={data.stats.totalGreenCards}
                icon="🟢"
                color="#4CAF50"
              />
              <StatCard
                label="Employees with Violations"
                value={data.stats.employeesWithViolations}
                icon="⚠️"
                color="#FF9800"
              />
            </div>
          </div>

          {/* Employee List */}
          <div>
            <h2>👥 Employees ({data.employees.length})</h2>
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '1px solid #E0E0E0',
              borderRadius: '8px',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead style={{
                  backgroundColor: '#F5F5F5',
                  position: 'sticky',
                  top: 0,
                }}>
                  <tr>
                    <th style={tableHeaderStyle}>ID</th>
                    <th style={tableHeaderStyle}>Name</th>
                    <th style={tableHeaderStyle}>Department</th>
                    <th style={tableHeaderStyle}>Violations</th>
                    <th style={tableHeaderStyle}>Green Cards</th>
                  </tr>
                </thead>
                <tbody>
                  {data.employees.map((employee) => (
                    <tr key={employee.id} style={{ borderBottom: '1px solid #E0E0E0' }}>
                      <td style={tableCellStyle}>{employee.id}</td>
                      <td style={tableCellStyle}>{employee.name}</td>
                      <td style={tableCellStyle}>{employee.department}</td>
                      <td style={tableCellStyle}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: employee.violations?.length > 0 ? '#FFF3E0' : '#F5F5F5',
                          color: employee.violations?.length > 0 ? '#E65100' : '#616161',
                          borderRadius: '4px',
                          fontSize: '14px',
                        }}>
                          {employee.violations?.length || 0}
                        </span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: employee.greenCards?.length > 0 ? '#E8F5E9' : '#F5F5F5',
                          color: employee.greenCards?.length > 0 ? '#2E7D32' : '#616161',
                          borderRadius: '4px',
                          fontSize: '14px',
                        }}>
                          {employee.greenCards?.length || 0}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Raw JSON (collapsible) */}
          <details style={{ marginTop: '24px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
              🔍 Raw JSON Data
            </summary>
            <pre style={{
              padding: '16px',
              backgroundColor: '#F5F5F5',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '12px',
            }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: 'white',
      border: `2px solid ${color}`,
      borderRadius: '8px',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#616161' }}>{label}</div>
    </div>
  );
}

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  color: '#424242',
};

const tableCellStyle = {
  padding: '12px',
};

export default APITest;
