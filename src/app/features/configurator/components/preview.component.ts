// src/app/features/configurator/components/preview.component.ts v3.4.0
import { ChangeDetectionStrategy, Component, input, effect, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { TPipe } from '../../../core/services/i18n.service';
import { bikeRendererService } from '../../../core/services/bike-renderer.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-preview',
  imports: [DecimalPipe, CurrencyPipe, TPipe],
  template: `
  <section id="preview-section" class="flex-1 relative flex flex-col bg-[#0f0f11]" role="region" aria-label="Bike preview">
    <div id="preview-header" class="absolute top-6 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10 z-10 pointer-events-none">
      <h1 id="preview-title" class="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">{{ name() }}</h1>
      <p id="preview-subtitle" class="text-zinc-500 font-serif italic mt-1 text-sm sm:text-base">{{ 'preview.v_custom' | t }}</p>
    </div>
    
    <div id="canvas-wrapper" class="flex-1 w-full h-full relative" aria-hidden="true">
      @if (!webglSupported()) {
        <div id="fallback-preview" class="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <svg id="bike-icon" width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-zinc-600">
            <circle cx="30" cy="60" r="18" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="90" cy="60" r="18" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="30" cy="60" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <circle cx="90" cy="60" r="12" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M30 42 L30 20 L60 20 L60 8" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M60 20 L90 20 L90 42" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M30 42 Q60 50 90 42" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M30 50 Q20 45 15 40" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <circle cx="15" cy="38" r="4" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M60 20 L65 10" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M55 12 L65 10 L65 2" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
          <p id="fallback-text" class="text-xs text-zinc-500">{{ 'preview.no_webgl' | t }}</p>
        </div>
      } @else {
        <div id="canvas-container" #rendererContainer class="absolute inset-0 cursor-move"></div>
      }
    </div>

    <div id="stats-bar" class="h-auto sm:h-24 border-t border-zinc-800 flex items-center px-4 sm:px-6 lg:px-12 py-3 sm:py-0 gap-4 sm:gap-6 lg:gap-12 bg-[#0a0a0b]/80 backdrop-blur-md overflow-x-auto" role="region" aria-label="Bike statistics">
      <div id="stat-weight" class="flex-shrink-0">
        <div id="stat-weight-label" class="text-[9px] sm:text-[10px] uppercase text-zinc-500 tracking-widest mb-1">{{ 'preview.est_weight' | t }}</div>
        <div id="stat-weight-value" class="text-lg sm:text-2xl font-light text-white">{{ weight() | number:'1.2-2' }} <span class="text-xs text-zinc-500">kg</span></div>
      </div>
      <div id="stat-divider-1" class="w-px h-8 sm:h-10 bg-zinc-800 flex-shrink-0"></div>
      <div id="stat-aero" class="flex-shrink-0">
        <div id="stat-aero-label" class="text-[9px] sm:text-[10px] uppercase text-zinc-500 tracking-widest mb-1">{{ 'preview.aero_drag' | t }}</div>
        <div id="stat-aero-value" class="text-lg sm:text-2xl font-light text-white">{{ cost() > 5000 ? '-14.2' : '-8.5' }} <span class="text-xs text-zinc-500">watts</span></div>
      </div>
      <div id="stat-divider-2" class="w-px h-8 sm:h-10 bg-zinc-800 flex-shrink-0"></div>
      <div id="stat-cost" class="flex-shrink-0">
        <div id="stat-cost-label" class="text-[9px] sm:text-[10px] uppercase text-zinc-500 tracking-widest mb-1">{{ 'preview.total_cost' | t }}</div>
        <div id="stat-cost-value" class="text-lg sm:text-2xl font-light text-amber-500">{{ cost() | currency:'USD':'symbol':'1.0-0' }} <span class="text-xs text-zinc-500">USD</span></div>
      </div>
    </div>
  </section>
  `
})
export class PreviewComponent implements AfterViewInit, OnDestroy {
  name = input<string>('S-Works Tarmac SL8');
  type = input<string>('Road');
  weight = input<number>(6.8);
  cost = input<number>(12000);

  @ViewChild('rendererContainer') rendererContainer!: ElementRef<HTMLDivElement>;

  private animationId = 0;
  private _webglSupported = signal(false);
  
  readonly webglSupported = computed(() => this._webglSupported());

  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      const currentType = this.type();
      if (isPlatformBrowser(this.platformId) && this._webglSupported() && bikeRendererService.getBikeGroup()) {
        bikeRendererService.buildBikeMesh(currentType);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.checkWebGLSupport()) {
        this._webglSupported.set(true);
        setTimeout(() => {
          this.initRenderer();
        }, 100);
      } else {
        this._webglSupported.set(false);
      }
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationId);
      window.removeEventListener('resize', this.onResize.bind(this));
      
      if (this.rendererContainer?.nativeElement) {
        bikeRendererService.dispose(this.rendererContainer.nativeElement);
      }
    }
  }

  private checkWebGLSupport(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!(gl && gl instanceof WebGLRenderingContext);
    } catch {
      return false;
    }
  }

  private initRenderer() {
    if (!this.rendererContainer?.nativeElement) return;
    
    const result = bikeRendererService.initialize(this.rendererContainer.nativeElement);
    if (result) {
      bikeRendererService.buildBikeMesh(this.type());
      this.animate();
      window.addEventListener('resize', this.onResize.bind(this));
    } else {
      this._webglSupported.set(false);
    }
  }

  private animate() {
    if (!this._webglSupported()) return;
    
    this.animationId = requestAnimationFrame(() => this.animate());
    bikeRendererService.render();
  }

  private onResize() {
    if (!this._webglSupported() || !this.rendererContainer) return;
    
    const el = this.rendererContainer.nativeElement;
    bikeRendererService.resize(el.clientWidth, el.clientHeight);
  }
}
