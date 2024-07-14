import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

describe('App Component', () => {
  test('renders Timer component on default route', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /Main/i })).toBeInTheDocument(); // memunculkan button Main
  });

  test('renders Setting component on /setting route', () => {
    window.history.pushState({}, 'Setting Page', '/setting');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /Setting/i })
    ).toBeInTheDocument(); // memunculkan button Setting
  });

  test('render History component on /history route', () => {
    window.history.pushState({}, 'History Page', '/history');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /History/i })
    ).toBeInTheDocument(); // memunculkan button History
  });

  test('render Login component on /login route', () => {
    window.history.pushState({}, 'Login Page', '/login');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument(); // memunculkan button Login
  });

  test('render Register component on /register route', () => {
    window.history.pushState({}, 'Register Page', '/register');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument(); // memunculkan button Register
  });

  test('renders NotFound component on invalid route', () => {
    window.history.pushState({}, 'Test Page', '/invalid-route');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument(); // memunculkan text Not Found
  });
});
