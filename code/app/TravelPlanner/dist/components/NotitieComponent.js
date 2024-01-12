var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { NoteService } from '../services/NoteService';
let NotitieComponent = class NotitieComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.tripId = '';
        this.notities = [];
        this.nieuweNotitie = '';
    }
    connectedCallback() {
        super.connectedCallback();
        this.laadNotities();
    }
    async laadNotities() {
        try {
            this.notities = await NoteService.getNotitiesByTripId(this.tripId);
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Kon notitie niet toevoegen:', error);
        }
    }
    render() {
        return html `
      <div class="notitie-container">
        <h2>Notities</h2>
        ${this.notities.map(notitie => html `
            <div class="notitie">
              <p>${notitie.inhoud}</p>
              <!-- Knoppen voor bewerken en verwijderen -->
            </div>
          `)}
        <div>
          <h3>Voeg nieuwe notitie toe</h3>
          <textarea @input="${this.handleInput}" .value="${this.nieuweNotitie}"></textarea>
          <button @click="${this.voegNotitieToe}">Voeg toe</button>
        </div>
      </div>
    `;
    }
};
NotitieComponent.styles = css `
    /* Voeg hier je CSS-stijlen toe */
    .notitie-container {
      /* Stijlen voor de container */
    }

    .notitie {
      /* Stijlen voor elke notitie */
    }

    /* Meer stijlen indien nodig */
  `;
__decorate([
    property({ type: String })
], NotitieComponent.prototype, "tripId", void 0);
__decorate([
    state()
], NotitieComponent.prototype, "notities", void 0);
__decorate([
    state()
], NotitieComponent.prototype, "nieuweNotitie", void 0);
NotitieComponent = __decorate([
    customElement('notitie-component')
], NotitieComponent);
export { NotitieComponent };
