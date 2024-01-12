import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { register } from '../services/authService';

@customElement('register-component')
class RegisterComponent extends LitElement {
  @state() private email = '';
  @state() private password = '';
  @state() private name = '';

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

navigateToLogin() {
    window.location.href = '/';
  }

  render() {
    return html`
      <h2>Register</h2>
      <form @submit=${this.handleRegister}>
        <input type="text" .value=${this.name} @input=${e => this.name = e.target.value} placeholder="Name" required>
        <input type="email" .value=${this.email} @input=${e => this.email = e.target.value} placeholder="Email" required>
        <input type="password" .value=${this.password} @input=${e => this.password = e.target.value} placeholder="Password" required>
        <button type="submit">Register</button>
        <button @click=${this.navigateToLogin}>Login</button>
      </form>
    `;
  }

  async handleRegister(e: Event) {
    e.preventDefault();
    try {
      const response = await register(this.name, this.email, this.password);
      console.log('Registration successful:', response);
      window.location.href = '/trips';
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'register-component': RegisterComponent;
  }
}
