import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

// Helper function to render component with providers and route
const renderWithProviders = (
  ui: React.ReactElement,
  { route = '/' } = {},
  pageName: string = 'Test page'
) => {
  window.history.pushState({}, pageName, route);

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test Page', '/');
  });

  test('renders Timer component on default route', () => {
    renderWithProviders(<App />, { route: '/' }, 'Main');
    expect(screen.getByRole('button', { name: /Main/i })).toBeInTheDocument(); // memunculkan button Main
  });

  test('renders Setting component on /setting route', () => {
    renderWithProviders(<App />, { route: '/setting' }, 'Setting');
    expect(
      screen.getByRole('button', { name: /Setting/i })
    ).toBeInTheDocument(); // memunculkan button Setting
  });

  test('renders History component on /history route', () => {
    renderWithProviders(<App />, { route: '/history' }, 'History');
    expect(
      screen.getByRole('button', { name: /History/i })
    ).toBeInTheDocument(); // memunculkan button History
  });

  test('renders Login component on /login route', () => {
    renderWithProviders(<App />, { route: '/login' }, 'Login');
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument(); // memunculkan button Login
  });

  test('renders Register component on /register route', () => {
    renderWithProviders(<App />, { route: '/register' }, 'Register');
    expect(
      screen.getByRole('button', { name: /Register/i })
    ).toBeInTheDocument(); // memunculkan button Register
  });

  test('renders NotFound component on invalid route', () => {
    renderWithProviders(<App />, { route: '/invalid-route' }, 'Not Found');
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument(); // memunculkan text Not Found
  });
});
