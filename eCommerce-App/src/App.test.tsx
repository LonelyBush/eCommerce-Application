import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  it('renders learn react link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkElement = screen.getByRole('link', { name: /learn react/i });
    expect(linkElement).toBeInTheDocument();
  });
});
