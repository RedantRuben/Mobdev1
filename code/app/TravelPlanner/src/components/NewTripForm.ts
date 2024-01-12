import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { TripService } from '../services/TripService';

@customElement('new-trip-form')
class NewTripForm extends LitElement {
  @state() private destination = '';
  @state() private startDate = '';
  @state() private endDate = '';

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background-color: #28282B;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      max-width: 400px;
      margin: 20px auto;
    }

    h2 {
      color: #673AB7;
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    label {
      color: #333;
      font-weight: bold;
    }

    input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    button {
      background-color: #6200ee;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #5E35B1;
    }
  `;

  render() {
    return html`
      <h2>Nieuwe Trip Toevoegen</h2>
      <form @submit="${this.handleSubmit}">
        <label>Bestemming:</label>
        <input type="text" .value=${this.destination} @input=${e => this.destination = e.target.value} placeholder="Bestemming" required>

        <label>Startdatum:</label>
        <input type="date" .value=${this.startDate} @input=${e => this.startDate = e.target.value} required>

        <label>Einddatum:</label>
        <input type="date" .value=${this.endDate} @input=${e => this.endDate = e.target.value} required>

        <button type="submit">Voeg Toe</button>
      </form>
    `;
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    try {
      const tripData = {
        destination: this.destination,
        startDate: new Date(this.startDate),
        endDate: new Date(this.endDate),
        userId: localStorage.getItem('userId')
      };
      await TripService.addTrip(tripData);
      Router.go('/trips');
    } catch (error) {
      console.error('Kon trip niet toevoegen:', error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'new-trip-form': NewTripForm;
  }
}
