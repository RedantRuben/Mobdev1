import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { TripService } from '../services/TripService';

@customElement('trip-list-component')
export class TripListComponent extends LitElement {
  @state() private trips: Trip[] = [];

  static styles = css`
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      background-color: #191919;
      margin: 10px 0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .trip-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .trip-actions {
      display: flex;
      gap: 10px;
    }
    button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #6200ee;
      color: white;
    }
    button:hover {
      background-color: #3700b3;
    }
    .add-trip-button {
      background-color: #03dac5;
      margin-bottom: 20px;
    }
    .add-trip-button:hover {
      background-color: #018786;
    }
    .profile-button {
      background-color: #6200ee;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 20px;
      transition: background-color 0.3s;
    }
    .profile-button:hover {
      background-color: #3700b3;
    }
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.fetchTrips();
  }

  async fetchTrips() {
    try {
      this.trips = await TripService.getAllTrips();
    } catch (error) {
      console.error('Kon trips niet ophalen:', error);
    }
  }

  navigateToProfile() {
    Router.go('/profile');
  }

  navigateToTripDetails(tripId: string) {
    Router.go(`/trips/${tripId}`);
  }

  render() {
    return html`
      <div class="header-container">
        <h2>My Trips</h2>
        <button class="profile-button" @click=${this.navigateToProfile}>Profiel</button>
      </div>
      <ul>
        ${this.trips.map(trip => html`
          <li class="trip-info">
            <span>
              ${trip.destination} (${this.formatDate(trip.startDate)} - ${this.formatDate(trip.endDate)})
            </span>
            <div class="trip-actions">
              <button @click=${() => this.navigateToTripDetails(trip._id)}>Details</button>
              <button @click=${() => Router.go(`/edit-trip/${trip._id}`)}>Bewerk</button>
              <button @click=${() => this.deleteTrip(trip._id)}>Verwijder</button>
            </div>
          </li>
        `)}
      </ul>
      <button class="add-trip-button" @click=${() => Router.go('/add-trip')}>Voeg Trip Toe</button>
    `;
  }
  

  async deleteTrip(tripId: string) {
    try {
      await TripService.deleteTrip(tripId);
      this.trips = this.trips.filter(trip => trip._id !== tripId);
      this.requestUpdate();
    } catch (error) {
      console.error('Kon trip niet verwijderen:', error);
    }
  }

  formatDate(dateString: string): string {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'trip-list-component': TripListComponent;
  }
}
