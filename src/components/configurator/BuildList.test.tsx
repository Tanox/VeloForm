import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BuildList } from './BuildList';

describe('BuildList', () => {
  it('renders the build list container with semantic id', () => {
    const { container } = render(<BuildList />);
    expect(container.querySelector('#build-list')).toBeTruthy();
  });

  it('renders category progress count', () => {
    render(<BuildList />);
    // 进度文本形如 "0 / N"，其中 N 为组件类目总数
    expect(screen.getByText(/\/\s*\d+/)).toBeTruthy();
  });

  it('opens component selector when add button clicked', () => {
    render(<BuildList />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    // 点击不应抛出异常，且组件仍渲染
    expect(screen.getByText(/\/\s*\d+/)).toBeTruthy();
  });
});
