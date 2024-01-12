var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
let ProfileComponent = class ProfileComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.user = { username: '', email: '' };
    }
    connectedCallback() {
        super.connectedCallback();
        this.fetchUserData();
    }
    async fetchUserData() {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('Geen authenticatietoken gevonden');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Gegevens konden niet worden opgehaald');
            }
            const data = await response.json();
            this.user = {
                username: data.name,
                email: data.email
            };
        }
        catch (error) {
            console.error('Fout bij het ophalen van gebruikersgegevens:', error);
        }
    }
    render() {
        return html `
      <div class="profile-container">
        <h2>Profielinstellingen</h2>
        <p>Ingelogd als: ${this.user.username || 'Niet beschikbaar'}</p>
        <form id="profile-form" @submit="${this.saveProfile}">
          <div>
            <label>Gebruikersnaam:</label>
            <input type="text" .value="${this.user.username}" @input="${this.handleUsernameChange}" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" .value="${this.user.email}" @input="${this.handleEmailChange}" />
          </div>
          <div class="button-group">
            <button type="submit">Opslaan</button>
            <button class="logout" type="button" @click="${this.logout}">Uitloggen</button>
          </div>
        </form>
      </div>
    `;
    }
    handleUsernameChange(e) {
        this.user.username = e.target.value;
    }
    handleEmailChange(e) {
        this.user.email = e.target.value;
    }
    async saveProfile(e) {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('Geen authenticatietoken gevonden voor het opslaan van profiel');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/users/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.user.username,
                    email: this.user.email
                })
            });
            if (!response.ok) {
                throw new Error('Profielgegevens konden niet worden opgeslagen');
            }
            console.log('Profielgegevens succesvol opgeslagen');
        }
        catch (error) {
            console.error('Fout bij het opslaan van profielgegevens:', error);
        }
    }
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        Router.go('/');
    }
};
ProfileComponent.styles = css `
    :host {
      display: block;
      padding: 20px;
    }

    .profile-container {
      max-width: 800px;
      margin: auto;
      background-color: #191919;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      color: white;
    }

    h2 {
      color: #6a1b9a;
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #6200ee;
      color: white;
      font-size: 16px;
    }

    button:hover {
      background-color: #3700b3;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }

    .button-group {
      margin-top: 10px;
    }
    .logout {
        margin-left: 10px;
        background-color: #ff1744;
    }
    .logout:hover {
        background-color: #d50000;
    }
  `;
__decorate([
    state()
], ProfileComponent.prototype, "user", void 0);
ProfileComponent = __decorate([
    customElement('profile-component')
], ProfileComponent);
