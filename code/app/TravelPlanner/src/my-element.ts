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

@customElement('my-element')
export class MyElement extends LitElement {
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
    return html`<div id="router-outlet"></div>`;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      box-sizing: border-box;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}