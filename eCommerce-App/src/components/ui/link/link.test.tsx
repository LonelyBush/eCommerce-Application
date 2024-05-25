import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LinkTemplate from './link';

interface TestLinkTemplateProps {
  to: string;
  children: React.ReactNode;
}

function TestLinkTemplate({
  to,
  children,
}: TestLinkTemplateProps): JSX.Element {
  return (
    <BrowserRouter>
      <LinkTemplate to={to}>{children}</LinkTemplate>
    </BrowserRouter>
  );
}

describe('LinkTemplate component', () => {
  it('renders LinkTemplate component', () => {
    render(<TestLinkTemplate to="/test-path">Test Link</TestLinkTemplate>);
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    render(<TestLinkTemplate to="/test-path">Test Link</TestLinkTemplate>);
    expect(screen.getByText('Test Link').closest('a')).toHaveAttribute(
      'href',
      '/test-path',
    );
  });
});
