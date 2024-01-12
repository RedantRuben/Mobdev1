export class TripService {
    static apiUrl = 'http://localhost:5000/api/trips';
  
    static async getAllTrips(): Promise<Trip[]> {
      const response = await fetch(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het ophalen van trips');
      }
      return response.json();
    }
  
    static async addTrip(tripData: Trip): Promise<Trip> {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error("Gebruiker is niet ingelogd");
      
        const tripWithUserId = { ...tripData, userId };
      
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(tripWithUserId)
        });
        if (!response.ok) {
          throw new Error('Fout bij het toevoegen van de trip');
        }
        return response.json();
      }
      
      
  
    static async updateTrip(tripData: Trip): Promise<Trip> {
      const response = await fetch(`${this.apiUrl}/${tripData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(tripData)
      });
      if (!response.ok) {
        throw new Error('Fout bij het updaten van de trip');
      }
      return response.json();
    }
  
    static async deleteTrip(tripId: string): Promise<void> {
      const response = await fetch(`${this.apiUrl}/${tripId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      if (!response.ok) {
        throw new Error('Fout bij het verwijderen van de trip');
      }
      return;
    }

    static async getTripById(tripId) {
        const response = await fetch(`${this.apiUrl}/${tripId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Fout bij het ophalen van trip details');
        }
        const data = await response.json();
        console.log("Trip data: ", data);
        return data;
      }
      
      
      
  }
  
  