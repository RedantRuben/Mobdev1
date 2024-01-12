var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TripService } from '../services/TripService';
import './UitgavenComponent';
import './NotitieComponent';
import './ActiviteitenComponent';
let TripDetailsComponent = class TripDetailsComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.trip = null;
    }
    async firstUpdated() {
        this.tripId = this.getTripIdFromUrl();
        this.fetchTripDetails();
    }
    getTripIdFromUrl() {
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
        }
        catch (error) {
            console.error('Kon trip details niet ophalen:', error);
        }
    }
    render() {
        if (!this.trip) {
            return html `<p>Geen tripgegevens beschikbaar.</p>`;
        }
        return html `
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
};
TripDetailsComponent.styles = css `
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
__decorate([
    property({ type: String })
], TripDetailsComponent.prototype, "tripId", void 0);
TripDetailsComponent = __decorate([
    customElement('trip-details-component')
], TripDetailsComponent);
export { TripDetailsComponent };
