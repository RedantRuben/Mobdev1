export class ActivityService {
    static apiUrl = 'http://localhost:5000/api/activities';

    static async getActiviteitenByTripId(tripId) {
      const response = await fetch(`${this.apiUrl}/trip/${tripId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het ophalen van activiteiten');
      }
      return response.json();
    }

    static async addActiviteit(activiteitData) {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(activiteitData)
      });
      if (!response.ok) {
        throw new Error('Fout bij het toevoegen van de activiteit');
      }
      return response.json();
    }

    static async updateActiviteit(activiteitId, activiteitData) {
      const response = await fetch(`${this.apiUrl}/${activiteitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(activiteitData)
      });
      if (!response.ok) {
        throw new Error('Fout bij het bijwerken van de activiteit');
      }
      return response.json();
    }

    static async deleteActiviteit(activiteitId) {
      const response = await fetch(`${this.apiUrl}/${activiteitId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het verwijderen van de activiteit');
      }
    }
}
