import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { login } from '../services/authService';

@customElement('login-component')
class LoginComponent extends LitElement {
  @state() private email = '';
  @state() private password = '';

  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background-color: #28282B;
      max-width: 400px;
      margin: 50px auto;
      border-radius: 8px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    }

    h2 {
      color: #1111
      text-align: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    input {
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    button {
      background-color: #673AB7;
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

  navigateToRegister() {
    window.location.href = '/register';
  }

  render() {
    return html`
      <h2>Login</h2>
      <form @submit=${this.handleLogin}>
        <input type="email" .value=${this.email} @input=${e => this.email = e.target.value} placeholder="Email" required>
        <input type="password" .value=${this.password} @input=${e => this.password = e.target.value} placeholder="Password" required>
        <button type="submit">Login</button>
        <button @click=${this.navigateToRegister}>Register</button>
      </form>
    `;
  }


async handleLogin(e: Event) {
  e.preventDefault();
  try {
      const response = await login(this.email, this.password);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userId', response.userId);
      Router.go('/trips');
  } catch (error) {
      console.error('Login failed:', error);
  }
}


}

declare global {
  interface HTMLElementTagNameMap {
    'login-component': LoginComponent;
  }
}