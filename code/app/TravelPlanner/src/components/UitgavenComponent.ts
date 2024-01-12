import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { ExpenseService } from '../services/ExpenseService';

@customElement('uitgaven-component')
export class UitgavenComponent extends LitElement {
  @property({ type: String }) tripId = '';
  @state() private uitgaven = [];
  @state() private nieuweUitgave = { beschrijving: '', bedrag: 0, datum: '' };

  static styles = css`
    .uitgaven-container {
    }

    .uitgave {
    }

  `;

  connectedCallback() {
    super.connectedCallback();
    this.laadUitgaven();
  }

  async laadUitgaven() {
    try {
      this.uitgaven = await ExpenseService.getUitgavenByTripId(this.tripId);
    } catch (error) {
      console.error('Kon uitgaven niet ophalen:', error);
    }
  }

  handleInput(e, veld) {
    this.nieuweUitgave = { ...this.nieuweUitgave, [veld]: e.target.value };
  }

  async voegUitgaveToe() {
    try {
      await ExpenseService.addUitgave({ ...this.nieuweUitgave, tripId: this.tripId });
      this.laadUitgaven();
    } catch (error) {
      console.error('Kon uitgave niet toevoegen:', error);
    }
  }

  render() {
    return html`
      <div class="uitgaven-container">
        <h2>Uitgaven</h2>
        ${this.uitgaven.map(
          uitgave => html`
            <div class="uitgave">
              <p>Beschrijving: ${uitgave.description}</p>
              <p>Bedrag: €${uitgave.amount}</p>
              <p>Datum: ${new Date(uitgave.date).toLocaleDateString()}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `
        )}
        <div>
          <h3>Voeg nieuwe uitgave toe</h3>
          <input type="text" placeholder="Beschrijving" @input="${e => this.handleInput(e, 'description')}">
          <input type="number" placeholder="Bedrag" @input="${e => this.handleInput(e, 'amount')}">
          <input type="date" @input="${e => this.handleInput(e, 'date')}">
          <button @click="${this.voegUitgaveToe}">Voeg toe</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uitgaven-component': UitgavenComponent;
  }
}
