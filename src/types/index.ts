export type BikeType = 'Road' | 'MTB' | 'Fold';
export type ComponentCategory = 'Frame' | 'Drivetrain' | 'Wheelset' | 'Suspension' | 'Cockpit' | 'Tires';

// Category-specific specifications
export interface DrivetrainSpecs {
  speeds?: number;
  cassetteRange?: string;
  chainrings?: string;
  batteryLife?: string;
  shiftSpeed?: string;
}

export interface WheelsetSpecs {
  rimDepth?: string;
  rimWidth?: string;
  weight?: number;
  material?: 'carbon' | 'aluminum' | 'steel';
}

export interface SuspensionSpecs {
  travel?: string;
  damping?: string;
  adjustability?: string[];
}

export interface FrameSpecs {
  material?: 'carbon' | 'aluminum' | 'titanium' | 'steel';
  geometry?: string;
  wheelSize?: string;
}

export interface CockpitSpecs {
  handlebarWidth?: string;
  stemLength?: string;
  dropReach?: string;
}

export interface TireSpecs {
  size?: string;
  compound?: string;
  tpi?: number;
  tubeless?: boolean;
}

// Union type for component specs based on category
export type ComponentSpecsMap = {
  Drivetrain: DrivetrainSpecs;
  Wheelset: WheelsetSpecs;
  Suspension: SuspensionSpecs;
  Frame: FrameSpecs;
  Cockpit: CockpitSpecs;
  Tires: TireSpecs;
};

export interface ConfigComponent<T extends ComponentCategory = ComponentCategory> {
  id: string;
  category: T;
  name: string;
  price: number;
  weight: number;
  bikeType: BikeType;
  specs?: ComponentSpecsMap[T];
  brand?: string;
  model?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

export interface Configuration {
  id: string;
  userId: string;
  bikeType: BikeType;
  name: string;
  components: ConfigComponent[];
  totalCost: number;
  estimatedWeight: number;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  tags?: string[];
}

export interface ConfigState {
  activeType: BikeType;
  components: ConfigComponent[];
  configId: string | null;
  manualConfigName: string | null;
  myConfigs: Configuration[];
  isSaving: boolean;
  showComponentSelector: boolean;
  editingComponentId: string;
  userId: string | null;
  comparingConfigIds: string[];
}
