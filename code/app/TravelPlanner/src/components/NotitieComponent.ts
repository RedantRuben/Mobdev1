import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { NoteService } from '../services/NoteService';

@customElement('notitie-component')
export class NotitieComponent extends LitElement {
  @property({ type: String }) tripId = '';
  @state() private notities = [];
  @state() private nieuweNotitie = '';

  static styles = css`
    /* Voeg hier je CSS-stijlen toe */
    .notitie-container {
      /* Stijlen voor de container */
    }

    .notitie {
      /* Stijlen voor elke notitie */
    }

    /* Meer stijlen indien nodig */
  `;

  connectedCallback() {
    super.connectedCallback();
    this.laadNotities();
  }

  async laadNotities() {
    try {
      this.notities = await NoteService.getNotitiesByTripId(this.tripId);
    } catch (error) {
      console.error('Kon notities niet ophalen:', error);
    }
  }

  handleInput(e) {
    this.nieuweNotitie = e.target.value;
  }

  async voegNotitieToe() {
    try {
      await NoteService.addNotitie({ inhoud: this.nieuweNotitie, tripId: this.tripId });
      this.laadNotities();
      this.nieuweNotitie = ''; // Reset het invoerveld
    } catch (error) {
      console.error('Kon notitie niet toevoegen:', error);
    }
  }

  render() {
    return html`
      <div class="notitie-container">
        <h2>Notities</h2>
        ${this.notities.map(
          notitie => html`
            <div class="notitie">
              <p>${notitie.inhoud}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `
        )}
        <div>
          <h3>Voeg nieuwe notitie toe</h3>
          <textarea @input="${this.handleInput}" .value="${this.nieuweNotitie}"></textarea>
          <button @click="${this.voegNotitieToe}">Voeg toe</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'notitie-component': NotitieComponent;
  }
}
