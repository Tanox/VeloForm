export type BikeType = 'Road' | 'MTB' | 'Fold';
export type ComponentCategory =
  | 'Frame'
  | 'Drivetrain'
  | 'Wheelset'
  | 'Suspension'
  | 'Cockpit'
  | 'Tires';

// --- 分类 specs 定义 ---
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

// --- 分类 → specs 类型映射 ---
export interface ComponentSpecsMap {
  Drivetrain: DrivetrainSpecs;
  Wheelset: WheelsetSpecs;
  Suspension: SuspensionSpecs;
  Frame: FrameSpecs;
  Cockpit: CockpitSpecs;
  Tires: TireSpecs;
}

// 宽松版 specs 类型（用于兼容未迁移的代码与运行时数据）
export type GenericSpecs = Record<string, unknown>;

// --- 共享字段 base ---
interface ConfigComponentBase {
  id: string;
  name: string;
  price: number;
  weight: number;
  bikeType: BikeType;
  brand?: string;
  model?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

// 宽松的通用配置组件类型：category 与 specs 的关联通过映射类型来映射表
// 这是项目内默认使用的普通对象类型，便于 interface extends 与对象字面量推断
export type ConfigComponent<
  T extends ComponentCategory = ComponentCategory
> = ConfigComponentBase & {
  category: T;
  specs?: ComponentSpecsMap[T];
};

export interface Configuration {
  id: string;
  userId?: string;
  bikeType: BikeType;
  name: string;
  components: ConfigComponent[];
  totalCost: number;
  estimatedWeight: number;
  createdAt?: Date;
  updatedAt?: Date;
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

// --- 类型守卫 ---
export function isCategory<T extends ComponentCategory>(
  comp: ConfigComponent,
  category: T
): comp is ConfigComponent<T> {
  return comp.category === category;
}
