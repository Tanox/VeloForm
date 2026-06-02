import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SummaryPanel } from './SummaryPanel';

describe('SummaryPanel', () => {
  it('renders without crashing', () => {
    const { container } = render(<SummaryPanel />);
    
    // Verify the panel renders successfully
    expect(container.firstChild).toBeTruthy();
  });
});
