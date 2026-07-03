import { ConfigComponent, GenericSpecs } from '@/types';

export interface ComponentDetail extends ConfigComponent {
  description?: string;
  specs?: GenericSpecs;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

import { drivetrainDetails } from './details/drivetrain';
import { wheelsetDetails } from './details/wheelset';
import { cockpitDetails } from './details/cockpit';
import { tireDetails } from './details/tires';
import { suspensionDetails } from './details/suspension';
import { frameDetails } from './details/frames';

// 聚合所有分类的组件详情数据
export const mockComponentDetails: Record<string, ComponentDetail> = {
  ...drivetrainDetails,
  ...wheelsetDetails,
  ...cockpitDetails,
  ...tireDetails,
  ...suspensionDetails,
  ...frameDetails,
};
