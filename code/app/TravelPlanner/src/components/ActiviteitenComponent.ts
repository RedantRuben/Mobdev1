import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { ActivityService } from '../services/ActivityService';

@customElement('activiteiten-component')
export class ActiviteitenComponent extends LitElement {
  @property({ type: String }) tripId = '';
  @state() private activiteiten = [];
  @state() private nieuweActiviteit = { naam: '', type: '', locatie: '', url: '', datum: '' };

  static styles = css`
    .activiteiten-container {
    }

    .activiteit {
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.laadActiviteiten();
  }

  async laadActiviteiten() {
    try {
      this.activiteiten = await ActivityService.getActiviteitenByTripId(this.tripId);
    } catch (error) {
      console.error('Kon activiteiten niet ophalen:', error);
    }
  }

  handleInput(e, veld) {
    this.nieuweActiviteit = { ...this.nieuweActiviteit, [veld]: e.target.value };
  }

  async voegActiviteitToe() {
    try {
      await ActivityService.addActiviteit({ ...this.nieuweActiviteit, tripId: this.tripId });
      this.laadActiviteiten();
    } catch (error) {
      console.error('Kon activiteit niet toevoegen:', error);
    }
  }

  render() {
    return html`
      <div class="activiteiten-container">
        <h2>Activiteiten</h2>
        ${this.activiteiten.map(
          activiteit => html`
            <div class="activiteit">
              <p>Naam: ${activiteit.naam}</p>
              <p>Type: ${activiteit.type}</p>
              <p>Locatie: ${activiteit.locatie}</p>
              <p>URL: ${activiteit.url}</p>
              <p>Datum: ${new Date(activiteit.datum).toLocaleDateString()}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `
        )}
        <div>
          <h3>Voeg nieuwe activiteit toe</h3>
          <input type="text" placeholder="Naam" @input="${e => this.handleInput(e, 'naam')}">
          <input type="text" placeholder="Type" @input="${e => this.handleInput(e, 'type')}">
          <input type="text" placeholder="Locatie" @input="${e => this.handleInput(e, 'locatie')}">
          <input type="text" placeholder="URL" @input="${e => this.handleInput(e, 'url')}">
          <input type="date" @input="${e => this.handleInput(e, 'datum')}">
          <button @click="${this.voegActiviteitToe}">Voeg toe</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'activiteiten-component': ActiviteitenComponent;
  }
}
