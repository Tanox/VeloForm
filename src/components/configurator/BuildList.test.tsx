import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BuildList } from './BuildList';

describe('BuildList', () => {
  it('renders without crashing', () => {
    const { container } = render(<BuildList />);
    
    // Verify the component renders successfully
    expect(container.firstChild).toBeTruthy();
  });
});
