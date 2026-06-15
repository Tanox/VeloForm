import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('should render basic skeleton', () => {
    const { container } = render(<Skeleton />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-3/4" />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toHaveClass('h-4');
    expect(skeleton).toHaveClass('w-3/4');
  });
});