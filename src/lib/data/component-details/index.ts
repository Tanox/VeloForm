import { roadDetails } from './road';
import { mtbDetails } from './mtb';
import { foldDetails } from './fold';
import type { ComponentDetail } from './types';

export const mockComponentDetails: Record<string, ComponentDetail> = {
  ...roadDetails,
  ...mtbDetails,
  ...foldDetails,
};

export type { ComponentDetail } from './types';
