import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TripService } from '../services/TripService';
import './UitgavenComponent';
import './NotitieComponent';
import './ActiviteitenComponent';

@customElement('trip-details-component')
export class TripDetailsComponent extends LitElement {
  @property({ type: String }) tripId: string | undefined;
  private trip: Trip | null = null;

  static styles = css`
    .trip-container {
      background-color: #191919;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .trip-header {
      color: #333;
      margin-bottom: 15px;
    }

    .trip-details {
      margin-bottom: 20px;
    }
  `;

  async firstUpdated() {
    this.tripId = this.getTripIdFromUrl();
    this.fetchTripDetails();
  }

  getTripIdFromUrl(): string {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    return pathSegments[pathSegments.length - 1];
  }

  async fetchTripDetails() {
    if (!this.tripId) {
      console.error('Trip ID is niet beschikbaar');
      return;
    }

    try {
      this.trip = await TripService.getTripById(this.tripId);
      this.requestUpdate();
    } catch (error) {
      console.error('Kon trip details niet ophalen:', error);
    }
  }

  render() {
    if (!this.trip) {
      return html`<p>Geen tripgegevens beschikbaar.</p>`;
    }

    return html`
      <div class="trip-container">
        <h2 class="trip-header">${this.trip.destination}</h2>
        <div class="trip-details">
          <p><strong>Startdatum:</strong> ${new Date(this.trip.startDate).toLocaleDateString()}</p>
          <p><strong>Einddatum:</strong> ${new Date(this.trip.endDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> ${this.trip.status}</p>
          <!-- Voeg hier meer details toe indien nodig -->
        </div>
        <uitgaven-component .tripId=${this.tripId}></uitgaven-component>
        <notitie-component .tripId=${this.tripId}></notitie-component>
        <activiteiten-component .tripId=${this.tripId}></activiteiten-component>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'trip-details-component': TripDetailsComponent;
  }
}
