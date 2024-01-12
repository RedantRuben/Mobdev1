import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router, IRouter } from '@vaadin/router';
import { TripService } from '../services/TripService';

@customElement('edit-trip-form')
class EditTripForm extends LitElement {
  @state() private tripId = '';
  @state() private destination = '';
  @state() private startDate = '';
  @state() private endDate = '';

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background-color: #28282B;
      max-width: 400px;
      margin: 50px auto;
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }

    h2 {
      color: #FFF;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    input, button {
      padding: 10px;
      border-radius: 4px;
      font-size: 16px;
    }

    input {
      border: 1px solid #ccc;
    }

    button {
      background-color: #673AB7; /* Paarse tint */
      color: white;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #5E35B1; /* Donkerder paars */
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.tripId = (Router as IRouter).location.params.tripId;
    this.fetchTrip();
  }

  async fetchTrip() {
    try {
      const trip = await TripService.getTripById(this.tripId);
      this.destination = trip.destination;
      this.startDate = trip.startDate.split('T')[0];
      this.endDate = trip.endDate.split('T')[0];
    } catch (error) {
      console.error('Kon trip niet ophalen:', error);
    }
  }

  render() {
    return html`
      <h2>Bewerk Trip</h2>
      <form @submit="${this.handleSubmit}">
        <label>Bestemming:</label>
        <input type="text" .value=${this.destination} @input=${e => this.destination = e.target.value} required>

        <label>Startdatum:</label>
        <input type="date" .value=${this.startDate} @input=${e => this.startDate = e.target.value} required>

        <label>Einddatum:</label>
        <input type="date" .value=${this.endDate} @input=${e => this.endDate = e.target.value} required>

        <button type="submit">Update</button>
      </form>
    `;
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    try {
      const tripData = {
        destination: this.destination,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate)
      };
      await TripService.updateTrip(this.tripId, tripData);
      Router.go('/trips');
    } catch (error) {
      console.error('Kon trip niet updaten:', error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edit-trip-form': EditTripForm;
  }
}
