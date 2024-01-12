export class ExpenseService {
    static apiUrl = 'http://localhost:5000/api/expenses';
  
    static async getUitgavenByTripId(tripId) {
      const response = await fetch(`${this.apiUrl}/trip/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het ophalen van uitgaven');
      }
      return response.json();
    }
  
    static async addUitgave(uitgaveData) {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(uitgaveData)
      });
      if (!response.ok) {
        throw new Error('Fout bij het toevoegen van de uitgave');
      }
      return response.json();
    }
  
    static async updateUitgave(uitgaveId, uitgaveData) {
      const response = await fetch(`${this.apiUrl}/${uitgaveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(uitgaveData)
      });
      if (!response.ok) {
        throw new Error('Fout bij het bijwerken van de uitgave');
      }
      return response.json();
    }
  
    static async deleteUitgave(uitgaveId) {
      const response = await fetch(`${this.apiUrl}/${uitgaveId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het verwijderen van de uitgave');
      }
    }
  }
  