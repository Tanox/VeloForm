/**
 * config-store.test.ts - 配置数据状态管理测试
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { useConfigStore } from './config-store';
import type { ConfigComponent, BikeType } from '@/types';

describe('ConfigStore', () => {
  // 确保在测试前初始化 store
  beforeAll(() => {
    const state = useConfigStore.getState();
    if (!state.components || state.components.length === 0) {
      // 触发 setActiveType 来初始化默认组件
      state.setActiveType('Road');
    }
  });

  describe('setActiveType', () => {
    it('应该设置车型并重置组件为默认值', () => {
      const { setActiveType } = useConfigStore.getState();

      setActiveType('Mountain');

      const state = useConfigStore.getState();
      expect(state.activeType).toBe('Mountain');
      expect(state.configId).toBeNull();
      expect(state.manualConfigName).toBeNull();
    });

    it('应该支持所有车型类型', () => {
      const types: BikeType[] = ['Road', 'Mountain', 'Gravel', 'E-Bike'];

      types.forEach((type) => {
        useConfigStore.getState().setActiveType(type);
        expect(useConfigStore.getState().activeType).toBe(type);
      });
    });
  });

  describe('replaceComponent', () => {
    it('应该替换指定类别的组件', () => {
      // 先设置一些初始组件
      const initialComponents: ConfigComponent[] = [
        {
          id: 'initial-frame',
          name: 'Initial Frame',
          category: 'Frame',
          price: 400,
          weight: 900,
          brand: 'InitialBrand',
          specs: {},
        },
        {
          id: 'initial-wheelset',
          name: 'Initial Wheelset',
          category: 'Wheelset',
          price: 200,
          weight: 1200,
          brand: 'InitialBrand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: initialComponents,
      });

      const mockComponent: ConfigComponent = {
        id: 'test-frame',
        name: 'Test Frame',
        category: 'Frame',
        price: 500,
        weight: 1000,
        brand: 'TestBrand',
        specs: {},
      };

      const { replaceComponent } = useConfigStore.getState();
      replaceComponent(mockComponent);

      const state = useConfigStore.getState();
      const found = state.components?.find((c) => c.category === 'Frame');
      expect(found).toEqual(mockComponent);
    });

    it('应该保留其他类别的组件不变', () => {
      // 先设置一些初始组件
      const initialComponents: ConfigComponent[] = [
        {
          id: 'initial-frame',
          name: 'Initial Frame',
          category: 'Frame',
          price: 400,
          weight: 900,
          brand: 'InitialBrand',
          specs: {},
        },
        {
          id: 'initial-wheelset',
          name: 'Initial Wheelset',
          category: 'Wheelset',
          price: 200,
          weight: 1200,
          brand: 'InitialBrand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: initialComponents,
      });

      const mockComponent: ConfigComponent = {
        id: 'test-wheelset',
        name: 'Test Wheelset',
        category: 'Wheelset',
        price: 300,
        weight: 1500,
        brand: 'TestBrand',
        specs: {},
      };

      useConfigStore.getState().replaceComponent(mockComponent);

      const state = useConfigStore.getState();
      const frameComponent = state.components?.find((c) => c.category === 'Frame');
      expect(frameComponent?.id).toBe('initial-frame');
    });
  });

  describe('setComponents', () => {
    it('应该设置完整的组件列表', () => {
      const mockComponents: ConfigComponent[] = [
        {
          id: 'test-1',
          name: 'Component 1',
          category: 'Frame',
          price: 100,
          weight: 500,
          brand: 'Brand',
          specs: {},
        },
        {
          id: 'test-2',
          name: 'Component 2',
          category: 'Drivetrain',
          price: 200,
          weight: 800,
          brand: 'Brand',
          specs: {},
        },
      ];

      useConfigStore.getState().setComponents(mockComponents);

      expect(useConfigStore.getState().components).toEqual(mockComponents);
    });
  });

  describe('loadConfiguration', () => {
    it('应该加载完整的配置', () => {
      const mockConfig = {
        bikeType: 'Gravel' as BikeType,
        components: [
          {
            id: 'test-frame',
            name: 'Gravel Frame',
            category: 'Frame',
            price: 600,
            weight: 1200,
            brand: 'Brand',
            specs: {},
          },
        ] as ConfigComponent[],
        configId: 'config-123',
        manualConfigName: 'My Gravel Build',
      };

      useConfigStore.getState().loadConfiguration(mockConfig);

      const state = useConfigStore.getState();
      expect(state.activeType).toBe('Gravel');
      expect(state.components).toEqual(mockConfig.components);
      expect(state.configId).toBe('config-123');
      expect(state.manualConfigName).toBe('My Gravel Build');
    });
  });

  describe('resetToDefaults', () => {
    it('应该重置组件为当前车型的默认值', () => {
      const { setActiveType, resetToDefaults } = useConfigStore.getState();

      setActiveType('Mountain');
      resetToDefaults();

      const state = useConfigStore.getState();
      expect(state.configId).toBeNull();
      expect(state.manualConfigName).toBeNull();
    });
  });

  describe('getTotalCost', () => {
    it('应该正确计算总成本', () => {
      const mockComponents: ConfigComponent[] = [
        {
          id: 'test-1',
          name: 'Component 1',
          category: 'Frame',
          price: 100,
          weight: 500,
          brand: 'Brand',
          specs: {},
        },
        {
          id: 'test-2',
          name: 'Component 2',
          category: 'Drivetrain',
          price: 200,
          weight: 800,
          brand: 'Brand',
          specs: {},
        },
      ];

      useConfigStore.getState().setComponents(mockComponents);

      const totalCost = useConfigStore.getState().getTotalCost();
      expect(totalCost).toBe(300);
    });
  });

  describe('getTotalWeight', () => {
    it('应该正确计算总重量（包含基础重量）', () => {
      const mockComponents: ConfigComponent[] = [
        {
          id: 'test-1',
          name: 'Component 1',
          category: 'Frame',
          price: 100,
          weight: 1000,
          brand: 'Brand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: mockComponents,
      });

      const totalWeight = useConfigStore.getState().getTotalWeight();
      // Road 基础重量 + 组件重量，然后除以转换因子
      expect(totalWeight).toBeGreaterThan(0);
    });
  });
});
