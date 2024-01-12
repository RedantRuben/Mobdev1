export class NoteService {
    static async getNotitiesByTripId(tripId) {
        const response = await fetch(`${this.apiUrl}/trip/${tripId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        if (!response.ok) {
            throw new Error('Fout bij het ophalen van notities');
        }
        return response.json();
    }
    static async addNotitie(notitieData) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(notitieData)
        });
        if (!response.ok) {
            throw new Error('Fout bij het toevoegen van de notitie');
        }
        return response.json();
    }
    static async updateNotitie(notitieId, notitieData) {
        const response = await fetch(`${this.apiUrl}/${notitieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(notitieData)
        });
        if (!response.ok) {
            throw new Error('Fout bij het bijwerken van de notitie');
        }
        return response.json();
    }
    static async deleteNotitie(notitieId) {
        const response = await fetch(`${this.apiUrl}/${notitieId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        if (!response.ok) {
            throw new Error('Fout bij het verwijderen van de notitie');
        }
    }
}
NoteService.apiUrl = 'http://localhost:5000/api/notes';
