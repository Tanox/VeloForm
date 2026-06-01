import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryPanel } from './SummaryPanel';

describe('SummaryPanel', () => {
  it('renders summary panel with cost and weight', () => {
    render(<SummaryPanel />);
    
    // Verify the panel renders
    expect(screen.getByText(/Total Cost|总价格/i)).toBeInTheDocument();
    expect(screen.getByText(/Est\. Weight|预估重量/i)).toBeInTheDocument();
  });

  it('displays save button', () => {
    render(<SummaryPanel />);
    
    // Save button should be present
    const saveButton = screen.getByRole('button', { name: /Save Build|保存配置/i });
    expect(saveButton).toBeInTheDocument();
  });
});
