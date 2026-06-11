/**
 * OptimizedImage.test.tsx - 优化图片组件测试
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OptimizedImage } from './OptimizedImage';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    onLoad,
    onError,
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
  }) => (
    <img
      src={src}
      alt={alt}
      data-testid="next-image"
      onLoad={onLoad}
      onError={onError}
    />
  ),
}));

describe('OptimizedImage', () => {
  it('应该渲染图片', () => {
    render(
      <OptimizedImage
        src="https://example.com/image.jpg"
        alt="测试图片"
        width={100}
        height={100}
      />
    );

    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByAltText('测试图片')).toBeInTheDocument();
  });

  it('空 src 时应该显示占位符', () => {
    render(<OptimizedImage src="" alt="测试图片" width={100} height={100} />);

    expect(screen.getByLabelText('测试图片')).toBeInTheDocument();
  });

  it('fallbackEnabled=false 时不显示占位符', () => {
    const { container } = render(
      <OptimizedImage
        src=""
        alt="测试图片"
        width={100}
        height={100}
        fallbackEnabled={false}
      />
    );

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
