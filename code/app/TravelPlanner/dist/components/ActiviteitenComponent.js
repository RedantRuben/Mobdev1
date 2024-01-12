var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { ActivityService } from '../services/ActivityService';
let ActiviteitenComponent = class ActiviteitenComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.tripId = '';
        this.activiteiten = [];
        this.nieuweActiviteit = { naam: '', type: '', locatie: '', url: '', datum: '' };
    }
    connectedCallback() {
        super.connectedCallback();
        this.laadActiviteiten();
    }
    async laadActiviteiten() {
        try {
            this.activiteiten = await ActivityService.getActiviteitenByTripId(this.tripId);
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Kon activiteit niet toevoegen:', error);
        }
    }
    render() {
        return html `
      <div class="activiteiten-container">
        <h2>Activiteiten</h2>
        ${this.activiteiten.map(activiteit => html `
            <div class="activiteit">
              <p>Naam: ${activiteit.naam}</p>
              <p>Type: ${activiteit.type}</p>
              <p>Locatie: ${activiteit.locatie}</p>
              <p>URL: ${activiteit.url}</p>
              <p>Datum: ${new Date(activiteit.datum).toLocaleDateString()}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `)}
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
};
ActiviteitenComponent.styles = css `
    .activiteiten-container {
    }

    .activiteit {
    }
  `;
__decorate([
    property({ type: String })
], ActiviteitenComponent.prototype, "tripId", void 0);
__decorate([
    state()
], ActiviteitenComponent.prototype, "activiteiten", void 0);
__decorate([
    state()
], ActiviteitenComponent.prototype, "nieuweActiviteit", void 0);
ActiviteitenComponent = __decorate([
    customElement('activiteiten-component')
], ActiviteitenComponent);
export { ActiviteitenComponent };
