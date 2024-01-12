var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { ExpenseService } from '../services/ExpenseService';
let UitgavenComponent = class UitgavenComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.tripId = '';
        this.uitgaven = [];
        this.nieuweUitgave = { beschrijving: '', bedrag: 0, datum: '' };
    }
    connectedCallback() {
        super.connectedCallback();
        this.laadUitgaven();
    }
    async laadUitgaven() {
        try {
            this.uitgaven = await ExpenseService.getUitgavenByTripId(this.tripId);
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Kon uitgave niet toevoegen:', error);
        }
    }
    render() {
        return html `
      <div class="uitgaven-container">
        <h2>Uitgaven</h2>
        ${this.uitgaven.map(uitgave => html `
            <div class="uitgave">
              <p>Beschrijving: ${uitgave.description}</p>
              <p>Bedrag: €${uitgave.amount}</p>
              <p>Datum: ${new Date(uitgave.date).toLocaleDateString()}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `)}
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
};
UitgavenComponent.styles = css `
    .uitgaven-container {
    }

    .uitgave {
    }

  `;
__decorate([
    property({ type: String })
], UitgavenComponent.prototype, "tripId", void 0);
__decorate([
    state()
], UitgavenComponent.prototype, "uitgaven", void 0);
__decorate([
    state()
], UitgavenComponent.prototype, "nieuweUitgave", void 0);
UitgavenComponent = __decorate([
    customElement('uitgaven-component')
], UitgavenComponent);
export { UitgavenComponent };
