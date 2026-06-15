/**
 * compare-store.test.ts - 配置比较状态管理测试
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useCompareStore } from './compare-store';
import type { Configuration } from '@/types';

describe('CompareStore', () => {
  const mockConfig1: Configuration = {
    id: 'config-1',
    bikeType: 'Road',
    components: [],
    totalCost: 1000,
    totalWeight: 8.5,
    createdAt: Date.now(),
    name: 'Road Build 1',
  };

  const mockConfig2: Configuration = {
    id: 'config-2',
    bikeType: 'Mountain',
    components: [],
    totalCost: 1500,
    totalWeight: 11.2,
    createdAt: Date.now(),
    name: 'Mountain Build',
  };

  const mockConfig3: Configuration = {
    id: 'config-3',
    bikeType: 'Gravel',
    components: [],
    totalCost: 1200,
    totalWeight: 9.8,
    createdAt: Date.now(),
    name: 'Gravel Build',
  };

  beforeEach(() => {
    useCompareStore.setState({
      comparingConfigIds: [],
      myConfigs: [],
    });
  });

  describe('toggleCompare', () => {
    it('应该切换配置的比较状态', () => {
      useCompareStore.setState({ myConfigs: [mockConfig1] });

      const { toggleCompare } = useCompareStore.getState();

      toggleCompare('config-1');
      expect(useCompareStore.getState().comparingConfigIds).toContain('config-1');

      toggleCompare('config-1');
      expect(useCompareStore.getState().comparingConfigIds).not.toContain('config-1');
    });

    it('应该限制最多比较 3 个配置', () => {
      useCompareStore.setState({
        myConfigs: [mockConfig1, mockConfig2, mockConfig3],
        comparingConfigIds: ['config-1', 'config-2', 'config-3'],
      });

      const mockConfig4: Configuration = {
        id: 'config-4',
        bikeType: 'E-Bike',
        components: [],
        totalCost: 2000,
        totalWeight: 15.0,
        createdAt: Date.now(),
        name: 'E-Bike Build',
      };

      useCompareStore.setState({
        myConfigs: [...useCompareStore.getState().myConfigs, mockConfig4],
      });

      useCompareStore.getState().toggleCompare('config-4');

      // 应该不添加第 4 个
      expect(useCompareStore.getState().comparingConfigIds.length).toBe(3);
      expect(useCompareStore.getState().comparingConfigIds).not.toContain('config-4');
    });
  });

  describe('clearCompare', () => {
    it('应该清空比较列表', () => {
      useCompareStore.setState({ comparingConfigIds: ['config-1', 'config-2'] });

      useCompareStore.getState().clearCompare();

      expect(useCompareStore.getState().comparingConfigIds).toEqual([]);
    });
  });

  describe('getComparingConfigs', () => {
    it('应该返回正在比较的配置对象', () => {
      useCompareStore.setState({
        myConfigs: [mockConfig1, mockConfig2],
        comparingConfigIds: ['config-1'],
      });

      const comparing = useCompareStore.getState().getComparingConfigs();

      expect(comparing.length).toBe(1);
      expect(comparing[0]).toEqual(mockConfig1);
    });

    it('应该过滤掉不存在的配置', () => {
      useCompareStore.setState({
        myConfigs: [mockConfig1],
        comparingConfigIds: ['config-1', 'non-existent'],
      });

      const comparing = useCompareStore.getState().getComparingConfigs();

      expect(comparing.length).toBe(1);
      expect(comparing[0]).toEqual(mockConfig1);
    });
  });

  describe('setMyConfigs', () => {
    it('应该设置我的配置列表', () => {
      const configs = [mockConfig1, mockConfig2];

      useCompareStore.getState().setMyConfigs(configs);

      expect(useCompareStore.getState().myConfigs).toEqual(configs);
    });
  });

  describe('addMyConfig', () => {
    it('应该添加新配置到列表', () => {
      useCompareStore.setState({ myConfigs: [mockConfig1] });

      useCompareStore.getState().addMyConfig(mockConfig2);

      const state = useCompareStore.getState();
      expect(state.myConfigs.length).toBe(2);
      expect(state.myConfigs).toContainEqual(mockConfig2);
    });
  });

  describe('updateMyConfig', () => {
    it('应该更新指定配置', () => {
      useCompareStore.setState({ myConfigs: [mockConfig1] });

      const updated = { ...mockConfig1, name: 'Updated Name' };
      useCompareStore.getState().updateMyConfig(updated);

      const state = useCompareStore.getState();
      expect(state.myConfigs[0].name).toBe('Updated Name');
    });
  });

  describe('deleteConfiguration', () => {
    it('应该删除指定配置', () => {
      useCompareStore.setState({ myConfigs: [mockConfig1, mockConfig2] });

      useCompareStore.getState().deleteConfiguration('config-1');

      const state = useCompareStore.getState();
      expect(state.myConfigs.length).toBe(1);
      expect(state.myConfigs[0]).toEqual(mockConfig2);
    });

    it('应该从比较列表中移除已删除的配置', () => {
      useCompareStore.setState({
        myConfigs: [mockConfig1, mockConfig2],
        comparingConfigIds: ['config-1', 'config-2'],
      });

      useCompareStore.getState().deleteConfiguration('config-1');

      const state = useCompareStore.getState();
      expect(state.comparingConfigIds).not.toContain('config-1');
      expect(state.comparingConfigIds).toContain('config-2');
    });
  });
});
