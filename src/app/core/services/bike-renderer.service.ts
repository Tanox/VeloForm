// src/app/core/services/bike-renderer.service.ts v3.4.0
import * as THREE from 'three';

export interface BikeRendererOptions {
  antialias?: boolean;
  alpha?: boolean;
  pixelRatio?: number;
}

export interface BikeMeshParts {
  bikeGroup: THREE.Group;
  materials: THREE.Material[];
  geometries: THREE.BufferGeometry[];
}

export class BikeRendererService {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private bikeGroup: THREE.Group | null = null;
  private materials: THREE.Material[] = [];
  private geometries: THREE.BufferGeometry[] = [];

  initialize(
    container: HTMLElement,
    options: BikeRendererOptions = {}
  ): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; bikeGroup: THREE.Group } | null {
    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: options.antialias ?? true,
        alpha: options.alpha ?? true,
      });
      this.renderer.setPixelRatio(options.pixelRatio ?? window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      this.scene = new THREE.Scene();
      
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      this.camera.position.set(2, 1, 3);
      this.camera.lookAt(0, 0, 0);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
      directionalLight.position.set(5, 5, 2);
      this.scene.add(directionalLight);

      this.bikeGroup = new THREE.Group();
      this.scene.add(this.bikeGroup);

      return {
        scene: this.scene,
        camera: this.camera,
        bikeGroup: this.bikeGroup,
      };
    } catch {
      return null;
    }
  }

  buildBikeMesh(bikeType: string): void {
    if (!this.bikeGroup) return;
    
    this.clearBikeMesh();

    const matFrame = new THREE.MeshStandardMaterial({ 
      color: bikeType === 'Road' ? 0xcc0000 : (bikeType === 'MTB' ? 0x334433 : 0xaaaaaa),
      roughness: 0.2, 
      metalness: 0.8 
    });
    const matTire = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    const matMetal = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.1 });

    this.materials.push(matFrame, matTire, matMetal);

    const createCylinder = (radius: number, length: number, mat: THREE.Material): THREE.Mesh => {
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

  clearBikeMesh(): void {
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

  render(): void {
    if (!this.renderer || !this.scene || !this.camera || !this.bikeGroup) return;
    
    this.bikeGroup.rotation.y += 0.005;
    this.renderer.render(this.scene, this.camera);
  }

  resize(width: number, height: number): void {
    if (!this.camera || !this.renderer) return;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  getBikeGroup(): THREE.Group | null {
    return this.bikeGroup;
  }

  dispose(container: HTMLElement): void {
    this.clearBikeMesh();
    
    this.materials.forEach(mat => mat.dispose());
    this.geometries.forEach(geo => geo.dispose());
    this.materials = [];
    this.geometries = [];
    
    if (this.scene) {
      if (this.bikeGroup) {
        this.scene.remove(this.bikeGroup);
      }
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
        if (this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
      } catch {
        // Ignore cleanup errors
      }
    }
    
    this.scene = null;
    this.camera = null;
    this.bikeGroup = null;
    this.renderer = null;
  }
}

export const bikeRendererService = new BikeRendererService();
