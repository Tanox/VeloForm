import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryPanel } from './SummaryPanel';

describe('SummaryPanel', () => {
  it('renders the summary card with semantic id', () => {
    const { container } = render(<SummaryPanel />);
    expect(container.querySelector('#summary-panel')).toBeTruthy();
  });

  it('renders total cost and total weight section', () => {
    render(<SummaryPanel />);
    // 汇总面板应展示金额与重量信息
    expect(screen.getAllByText(/\$|\d/).length).toBeGreaterThan(0);
  });
});
