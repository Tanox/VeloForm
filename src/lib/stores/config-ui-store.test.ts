/**
 * config-ui-store.test.ts - UI 状态管理测试
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useConfigUIStore } from './config-ui-store';

describe('ConfigUIStore', () => {
  beforeEach(() => {
    useConfigUIStore.setState({
      showComponentSelector: false,
      editingComponentId: '',
      isSaving: false,
    });
  });

  describe('toggleComponentSelector', () => {
    it('应该切换选择器显示状态', () => {
      const { toggleComponentSelector } = useConfigUIStore.getState();

      toggleComponentSelector();
      expect(useConfigUIStore.getState().showComponentSelector).toBe(true);

      toggleComponentSelector();
      expect(useConfigUIStore.getState().showComponentSelector).toBe(false);
    });

    it('应该设置编辑组件 ID', () => {
      const { toggleComponentSelector } = useConfigUIStore.getState();

      toggleComponentSelector('component-123');

      const state = useConfigUIStore.getState();
      expect(state.showComponentSelector).toBe(true);
      expect(state.editingComponentId).toBe('component-123');
    });
  });

  describe('openComponentSelector', () => {
    it('应该打开选择器', () => {
      const { openComponentSelector } = useConfigUIStore.getState();

      openComponentSelector();

      expect(useConfigUIStore.getState().showComponentSelector).toBe(true);
    });

    it('应该设置编辑组件 ID', () => {
      const { openComponentSelector } = useConfigUIStore.getState();

      openComponentSelector('component-456');

      const state = useConfigUIStore.getState();
      expect(state.editingComponentId).toBe('component-456');
    });

    it('没有传入 ID 时应该使用空字符串', () => {
      const { openComponentSelector } = useConfigUIStore.getState();

      openComponentSelector();

      expect(useConfigUIStore.getState().editingComponentId).toBe('');
    });
  });

  describe('closeComponentSelector', () => {
    it('应该关闭选择器', () => {
      useConfigUIStore.setState({ showComponentSelector: true });

      useConfigUIStore.getState().closeComponentSelector();

      expect(useConfigUIStore.getState().showComponentSelector).toBe(false);
    });
  });

  describe('setEditingComponentId', () => {
    it('应该设置编辑组件 ID', () => {
      const { setEditingComponentId } = useConfigUIStore.getState();

      setEditingComponentId('component-789');

      expect(useConfigUIStore.getState().editingComponentId).toBe('component-789');
    });
  });

  describe('setSaving', () => {
    it('应该设置保存状态', () => {
      const { setSaving } = useConfigUIStore.getState();

      setSaving(true);
      expect(useConfigUIStore.getState().isSaving).toBe(true);

      setSaving(false);
      expect(useConfigUIStore.getState().isSaving).toBe(false);
    });
  });
});
