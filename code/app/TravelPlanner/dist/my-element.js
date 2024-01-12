var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import './components/LoginComponent';
import './components/RegisterComponent';
import './components/ProfileComponent';
import './components/AddTripForm';
import './components/EditTripForm';
import './components/NewTripForm';
import './components/TripDetailsComponent';
import './components/UitgavenComponent';
let MyElement = class MyElement extends LitElement {
    firstUpdated() {
        const router = new Router(this.renderRoot.querySelector('#router-outlet'));
        router.setRoutes([
            { path: '/', component: 'login-component' },
            { path: '/register', component: 'register-component' },
            {
                path: '/profile',
                component: 'profile-component',
                action: () => {
                    if (!localStorage.getItem('authToken')) {
                        return Router.go('/');
                    }
                },
            },
            {
                path: '/trips',
                component: 'trip-list-component',
                action: () => {
                    if (!localStorage.getItem('authToken')) {
                        return Router.go('/');
                    }
                },
            },
            {
                path: '/add-trip',
                component: 'new-trip-form',
                action: () => {
                    if (!localStorage.getItem('authToken')) {
                        return Router.go('/');
                    }
                },
            },
            {
                path: '/edit-trip/:tripId',
                component: 'edit-trip-form',
                action: () => {
                    if (!localStorage.getItem('authToken')) {
                        return Router.go('/');
                    }
                },
            },
            {
                path: '/trips/:tripId',
                component: 'trip-details-component',
                action: () => {
                    if (!localStorage.getItem('authToken')) {
                        Router.go('/');
                    }
                },
            },
        ]);
    }
    render() {
        return html `<div id="router-outlet"></div>`;
    }
};
MyElement.styles = css `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      box-sizing: border-box;
    }
  `;
MyElement = __decorate([
    customElement('my-element')
], MyElement);
export { MyElement };
