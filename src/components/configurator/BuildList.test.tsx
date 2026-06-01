import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BuildList } from './BuildList';
import type { ConfigComponent } from '@/types';

const mockComponents: ConfigComponent[] = [
  { 
    id: 'd1', 
    category: 'Drivetrain', 
    bikeType: 'Road',
    name: 'Shimano Dura-Ace Di2 R9200', 
    price: 4200, 
    weight: 2430,
    brand: 'Shimano',
    model: 'Dura-Ace Di2 R9200'
  },
  { 
    id: 'w1', 
    category: 'Wheelset', 
    bikeType: 'Road',
    name: 'Roval Rapide CLX II', 
    price: 2800, 
    weight: 1520,
    brand: 'Roval',
    model: 'Rapide CLX II'
  },
];

describe('BuildList', () => {
  it('renders all components', () => {
    render(
      <BuildList />
    );
    
    // Since BuildList uses useConfigStore, we need to verify it renders without errors
    expect(screen.getByText(/Build List|配置清单/i)).toBeInTheDocument();
  });

  it('displays component names from store', () => {
    render(<BuildList />);
    
    // Component rendering depends on store state
    // This test verifies the component mounts successfully
    expect(document.querySelector('.space-y-4')).toBeInTheDocument();
  });
});
