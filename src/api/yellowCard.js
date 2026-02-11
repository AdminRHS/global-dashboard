/**
 * Yellow Card Dashboard API Client
 * Handles all interactions with Yellow Card Dashboard API
 *
 * Base URL: https://yc.anyemp.com/api
 * Endpoints:
 *   - GET /get-employees - Returns all employees with violations and green cards
 *   - POST /add-violation - Add violation to employee
 *   - POST /add-green-card - Add green card to employee
 *   - DELETE /delete-violation - Remove violation by ID
 *   - DELETE /delete-green-card - Remove green card by ID
 */

import APIClient from './client.js';

class YellowCardAPI extends APIClient {
  constructor() {
    const baseURL = import.meta.env.VITE_YELLOW_CARD_API || 'https://yc.anyemp.com/api';
    super(baseURL, {
      timeout: 15000, // Yellow Card API can be slow
    });
  }

  /**
   * Get all employees with violations and green cards
   * @returns {Promise<Array>} Array of employee objects
   */
  async getEmployees() {
    try {
      const response = await this.get('/get-employees');
      // API returns array directly, not nested in .employees
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error;
    }
  }

  /**
   * Calculate statistics from employee data
   * @param {Array} employees - Array of employee objects
   * @returns {Object} Statistics object
   */
  calculateStats(employees) {
    if (!Array.isArray(employees) || employees.length === 0) {
      return {
        totalEmployees: 0,
        totalViolations: 0,
        totalGreenCards: 0,
        employeesWithViolations: 0,
        employeesWithGreenCards: 0,
        averageViolationsPerEmployee: 0,
        averageGreenCardsPerEmployee: 0,
      };
    }

    const totalEmployees = employees.length;
    const totalViolations = employees.reduce((sum, emp) => sum + (emp.violations?.length || 0), 0);
    const totalGreenCards = employees.reduce((sum, emp) => sum + (emp.greenCards?.length || 0), 0);
    const employeesWithViolations = employees.filter(emp => emp.violations?.length > 0).length;
    const employeesWithGreenCards = employees.filter(emp => emp.greenCards?.length > 0).length;

    return {
      totalEmployees,
      totalViolations,
      totalGreenCards,
      employeesWithViolations,
      employeesWithGreenCards,
      averageViolationsPerEmployee: (totalViolations / totalEmployees).toFixed(2),
      averageGreenCardsPerEmployee: (totalGreenCards / totalEmployees).toFixed(2),
    };
  }

  /**
   * Get employees with calculated statistics
   * @returns {Promise<Object>} Object with employees array and stats
   */
  async getEmployeesWithStats() {
    try {
      const employees = await this.getEmployees();
      const stats = this.calculateStats(employees);

      return {
        employees,
        stats,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Failed to fetch employees with stats:', error);
      throw error;
    }
  }

  /**
   * Add violation to employee
   * @param {Object} data - Violation data
   * @param {string} data.employeeId - Employee ID (e.g., "EMP-37226")
   * @param {string} data.type - Violation type (Documentation, Workflow, Communication)
   * @param {string} data.description - Violation description
   * @param {string} data.date - Violation date (ISO format)
   * @returns {Promise<Object>} Response data
   */
  async addViolation(data) {
    try {
      return await this.post('/add-violation', data);
    } catch (error) {
      console.error('Failed to add violation:', error);
      throw error;
    }
  }

  /**
   * Add green card to employee
   * @param {Object} data - Green card data
   * @param {string} data.employeeId - Employee ID (e.g., "EMP-37226")
   * @param {string} data.type - Green card type (Documentation, Workflow, Communication, Achievement, Recognition)
   * @param {string} data.description - Green card description
   * @param {string} data.date - Green card date (ISO format)
   * @returns {Promise<Object>} Response data
   */
  async addGreenCard(data) {
    try {
      return await this.post('/add-green-card', data);
    } catch (error) {
      console.error('Failed to add green card:', error);
      throw error;
    }
  }

  /**
   * Delete violation by ID
   * @param {number} violationId - Violation ID
   * @returns {Promise<Object>} Response data
   */
  async deleteViolation(violationId) {
    try {
      return await this.delete('/delete-violation', { violationId });
    } catch (error) {
      console.error('Failed to delete violation:', error);
      throw error;
    }
  }

  /**
   * Delete green card by ID
   * @param {number} greenCardId - Green card ID
   * @returns {Promise<Object>} Response data
   */
  async deleteGreenCard(greenCardId) {
    try {
      return await this.delete('/delete-green-card', { greenCardId });
    } catch (error) {
      console.error('Failed to delete green card:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new YellowCardAPI();
