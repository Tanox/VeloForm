// src/app/features/configurator/components/preview.component.ts v3.4.0
import { ChangeDetectionStrategy, Component, input, effect, ElementRef, ViewChild, AfterViewInit, OnDestroy, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DecimalPipe, CurrencyPipe } from '@angular/common';
import { TPipe } from '../../../core/services/i18n.service';
import * as THREE from 'three';

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

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private bikeGroup!: THREE.Group;
  private animationId = 0;
  private _webglSupported = signal(false);
  
  private materials: THREE.Material[] = [];
  private geometries: THREE.BufferGeometry[] = [];
  
  readonly webglSupported = computed(() => this._webglSupported());

  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      const currentType = this.type();
      if (isPlatformBrowser(this.platformId) && this._webglSupported() && this.bikeGroup) {
        this.buildBikeMesh(currentType);
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.checkWebGLSupport()) {
        this._webglSupported.set(true);
        setTimeout(() => {
          this.initThree();
          this.buildBikeMesh(this.type());
          this.animate();
          window.addEventListener('resize', this.onResize.bind(this));
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
      
      this.clearBikeMesh();
      
      this.materials.forEach(mat => mat.dispose());
      this.geometries.forEach(geo => geo.dispose());
      this.materials = [];
      this.geometries = [];
      
      if (this.scene) {
        this.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(mat => mat.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
        this.scene.clear();
      }
      
      if (this.renderer) {
        try {
          this.renderer.dispose();
          if (this.renderer.domElement.parentNode && this.rendererContainer) {
            this.rendererContainer.nativeElement.removeChild(this.renderer.domElement);
          }
        } catch {
          // Ignore cleanup errors
        }
      }
      
      this.camera = null as any;
      this.scene = null as any;
      this.renderer = null as any;
      this.bikeGroup = null as any;
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

  private clearBikeMesh() {
    if (!this.bikeGroup) return;
    
    while (this.bikeGroup.children.length > 0) {
      const child = this.bikeGroup.children[0];
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.dispose();
          const geoIndex = this.geometries.indexOf(child.geometry);
          if (geoIndex > -1) {
            this.geometries.splice(geoIndex, 1);
          }
        }
        
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
          child.material.forEach(mat => {
            const matIndex = this.materials.indexOf(mat);
            if (matIndex > -1) {
              this.materials.splice(matIndex, 1);
            }
          });
        } else if (child.material) {
          child.material.dispose();
          const matIndex = this.materials.indexOf(child.material);
          if (matIndex > -1) {
            this.materials.splice(matIndex, 1);
          }
        }
      }
      this.bikeGroup.remove(child);
    }
  }

  private initThree() {
    try {
      const el = this.rendererContainer.nativeElement;
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(el.clientWidth, el.clientHeight);
      el.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      
      this.camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 100);
      this.camera.position.set(2, 1, 3);
      this.camera.lookAt(0, 0, 0);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 5, 2);
      this.scene.add(directionalLight);

      this.bikeGroup = new THREE.Group();
      this.scene.add(this.bikeGroup);
    } catch {
      this._webglSupported.set(false);
    }
  }

  private buildBikeMesh(bikeType: string) {
    if (!this.bikeGroup) return;
    
    this.clearBikeMesh();

    const matFrame = new THREE.MeshStandardMaterial({ 
      color: bikeType === 'Road' ? 0xcc0000 : (bikeType === 'MTB' ? 0x334433 : 0xaaaaaa),
      roughness: 0.2, metalness: 0.8 
    });
    const matTire = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const matMetal = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 });

    this.materials.push(matFrame, matTire, matMetal);

    const createCylinder = (radius: number, length: number, mat: THREE.Material) => {
      const geo = new THREE.CylinderGeometry(radius, radius, length, 16);
      this.geometries.push(geo);
      const mesh = new THREE.Mesh(geo, mat);
      return mesh;
    };

    const tireRadius = bikeType === 'Fold' ? 0.2 : 0.4;
    const tireThick = bikeType === 'MTB' ? 0.05 : 0.02;
    const geoTire = new THREE.TorusGeometry(tireRadius, tireThick, 16, 64);
    this.geometries.push(geoTire);
    
    const wheel1 = new THREE.Mesh(geoTire, matTire);
    wheel1.position.set(-0.6, -0.2, 0);
    
    const wheel2 = new THREE.Mesh(geoTire, matTire);
    wheel2.position.set(0.6, -0.2, 0);

    const topTube = createCylinder(0.02, 0.7, matFrame);
    topTube.position.set(0, 0.3, 0);
    topTube.rotation.z = Math.PI / 2;

    const downTube = createCylinder(0.025, 0.8, matFrame);
    downTube.position.set(-0.1, 0.05, 0);
    downTube.rotation.z = -Math.PI / 4;

    const seatTube = createCylinder(0.02, 0.7, matFrame);
    seatTube.position.set(-0.35, 0.1, 0);
    seatTube.rotation.z = Math.PI / 8;

    const chainStay = createCylinder(0.015, 0.5, matFrame);
    chainStay.position.set(-0.45, -0.2, 0);
    chainStay.rotation.z = Math.PI / 2;

    const seatStay = createCylinder(0.015, 0.55, matFrame);
    seatStay.position.set(-0.5, 0.05, 0);
    seatStay.rotation.z = -Math.PI / 3;

    const fork = createCylinder(0.015, 0.6, matFrame);
    fork.position.set(0.5, 0.05, 0);
    fork.rotation.z = Math.PI / 8;

    const handlebars = createCylinder(0.015, 0.4, matMetal);
    handlebars.position.set(0.4, 0.4, 0);
    handlebars.rotation.x = Math.PI / 2;

    if (bikeType === 'MTB') {
        handlebars.scale.set(1, 1.5, 1);
        downTube.scale.set(1.5, 1, 1.5);
    } else if (bikeType === 'Fold') {
        seatTube.scale.set(1, 1.5, 1);
        fork.scale.set(1, 0.8, 1);
        topTube.rotation.z = -Math.PI / 2 + 0.2;
    }

    this.bikeGroup.add(wheel1, wheel2, topTube, downTube, seatTube, chainStay, seatStay, fork, handlebars);
  }

  private animate() {
    if (!this._webglSupported()) return;
    
    this.animationId = requestAnimationFrame(() => this.animate());
    
    if (this.bikeGroup) {
      this.bikeGroup.rotation.y += 0.005;
    }
    
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  private onResize() {
    if (!this._webglSupported() || !this.rendererContainer) return;
    
    const el = this.rendererContainer.nativeElement;
    this.camera.aspect = el.clientWidth / el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(el.clientWidth, el.clientHeight);
  }
}
