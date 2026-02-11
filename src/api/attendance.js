/**
 * HR Attendance Dashboard API Client
 * Handles attendance tracking data from Google Sheets
 *
 * Base URL: https://attendance.anyemp.com/api
 * Endpoint: GET /attendance
 */

import APIClient from './client.js';

class AttendanceAPI extends APIClient {
  constructor() {
    const baseURL = import.meta.env.VITE_ATTENDANCE_API || '/api';
    super(baseURL, {
      timeout: 15000,
    });
  }

  /**
   * Get all attendance data
   * @returns {Promise<Object>} Attendance data object
   */
  async getAttendanceData() {
    try {
      const response = await this.get('/attendance');

      if (!response.data.success) {
        throw new Error(response.data.error || 'Failed to fetch attendance data');
      }

      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
      throw error;
    }
  }

  /**
   * Calculate summary statistics from attendance data
   * @param {Object} data - Attendance data object
   * @returns {Object} Summary statistics
   */
  calculateStats(data) {
    if (!data || !data.employees) {
      return {
        totalEmployees: 0,
        onTime: 0,
        late: 0,
        absent: 0,
        averagePunctualityRate: 0,
        totalDepartments: 0,
      };
    }

    const totalEmployees = data.employees.length;
    const totalDepartments = new Set(data.employees.map(emp => emp.department)).size;

    // Calculate from daily stats if available
    if (data.dailyStats && data.dailyStats.length > 0) {
      const latestDay = data.dailyStats[data.dailyStats.length - 1];
      return {
        totalEmployees,
        onTime: latestDay.onTime,
        late: latestDay.late1to15 + latestDay.late16to30 + latestDay.lateOver30,
        absent: latestDay.absent,
        averagePunctualityRate: latestDay.punctualityRate,
        totalDepartments,
        latestDate: latestDay.date,
      };
    }

    // Fallback: calculate from employee stats
    if (data.employeeStats && data.employeeStats.length > 0) {
      const avgPunctuality = data.employeeStats.reduce((sum, emp) => sum + emp.punctualityRate, 0) / data.employeeStats.length;
      return {
        totalEmployees,
        onTime: 0,
        late: 0,
        absent: 0,
        averagePunctualityRate: avgPunctuality.toFixed(1),
        totalDepartments,
      };
    }

    return {
      totalEmployees,
      onTime: 0,
      late: 0,
      absent: 0,
      averagePunctualityRate: 0,
      totalDepartments,
    };
  }

  /**
   * Get attendance data with calculated statistics
   * @returns {Promise<Object>} Object with data and stats
   */
  async getAttendanceWithStats() {
    try {
      const data = await this.getAttendanceData();
      const stats = this.calculateStats(data);

      return {
        data,
        stats,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to fetch attendance with stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new AttendanceAPI();
