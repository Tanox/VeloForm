// src/app/features/configurator/services/config.service.ts v3.4.0
import { onAuthStateChanged } from 'firebase/auth';
import { Configuration, ConfigComponent } from '../../../core/models/types';
import { configStore } from '../../../core/stores/config.store';
import { firebaseService } from '../../../core/services/firebase.service';
import { configRepository } from '../../../core/services/config.repository';
import { notificationService } from '../../../core/services/notification.service';
import { t } from '../../../core/services/i18n.service';

class ConfigService {
  private authInitialized = false;

  initAuthListener() {
    if (this.authInitialized) return;
    this.authInitialized = true;

    onAuthStateChanged(firebaseService.auth, (user) => {
      configStore.setIsLoggedIn(!!user);
    });
  }

  async initializeApp() {
    this.initAuthListener();
    const { getComponentsFromDB } = await import('../../../core/services/component.repository');
    const components = await getComponentsFromDB();
    configStore.setAllDbComponents(components);
  }

  async saveCurrentConfig(): Promise<string | null> {
    if (!configStore.isLoggedIn()) {
      notificationService.error(t('auth.login_required'));
      return null;
    }

    configStore.setIsSaving(true);

    const config: Configuration = {
      id: configStore.configId() || undefined,
      bikeType: configStore.activeType(),
      name: configStore.configName(),
      components: configStore.components(),
      totalCost: configStore.totalCost(),
      estimatedWeight: configStore.totalWeight(),
    };

    const validation = this.validateConfiguration(config);
    if (!validation.valid) {
      notificationService.warning(validation.error || 'Invalid configuration', 4000);
      configStore.setIsSaving(false);
      return null;
    }

    try {
      const newId = await configRepository.save(config);
      configStore.setConfigId(newId);
      await this.refreshMyConfigs();
      return newId;
    } catch (error) {
      console.error('Failed to save configuration:', error);
      notificationService.error('Failed to save configuration. Please try again.', 4000);
      return null;
    } finally {
      configStore.setIsSaving(false);
    }
  }

  async refreshMyConfigs() {
    const configs = await configRepository.getUserConfigs();
    configStore.setMyConfigs(configs);
  }

  private validateConfiguration(config: Configuration): { valid: boolean; error?: string } {
    if (!config.bikeType || !['Road', 'MTB', 'Fold'].includes(config.bikeType)) {
      return { valid: false, error: 'Invalid bike type' };
    }
    
    if (!config.components || config.components.length === 0) {
      return { valid: false, error: 'Configuration must have at least one component' };
    }
    
    if (!config.name || config.name.trim().length === 0) {
      return { valid: false, error: 'Configuration name is required' };
    }
    
    return { valid: true };
  }

  async removeConfig(id: string): Promise<boolean> {
    configStore.setIsSaving(true);
    try {
      await configRepository.delete(id);
      await this.refreshMyConfigs();
      
      if (configStore.configId() === id) {
        configStore.resetToDefaults();
      }
      notificationService.success('Configuration deleted successfully', 3000);
      return true;
    } catch (error) {
      console.error('Failed to delete configuration:', error);
      notificationService.error('Failed to delete configuration. Please try again.', 4000);
      return false;
    } finally {
      configStore.setIsSaving(false);
    }
  }

  updateComponent(newComponent: ConfigComponent) {
    const oldComponentId = configStore.editingComponentId();
    configStore.replaceComponent(oldComponentId, newComponent);
    configStore.setShowComponentSelector(false);
    notificationService.success(`${newComponent.name}`, 2000);
  }

  openComponentEditor(component: ConfigComponent) {
    configStore.setEditingComponentId(component.id);
    configStore.setShowComponentSelector(true);
  }

  onTypeSelected(type: 'Road' | 'MTB' | 'Fold') {
    configStore.setActiveType(type);
  }

  loadConfiguration(cfg: Configuration) {
    configStore.loadConfiguration(cfg);
  }

  toggleLibrary(show?: boolean) {
    configStore.setShowLibrary(show ?? !configStore.showLibrary());
    if (configStore.showLibrary() && configStore.isLoggedIn()) {
      this.refreshMyConfigs();
    }
  }

  onDeploy() {
    const isLoggedIn = configStore.isLoggedIn();
    if (!isLoggedIn) {
      notificationService.error('Please login first to deploy your configuration', 4000);
      return;
    }
    
    if (configStore.components().length === 0) {
      notificationService.warning('No components configured. Please add components before deploying.', 4000);
      return;
    }
    
    notificationService.info('Deployment initiated to Vercel (Mock). Production build triggered.', 4000);
  }
}

export const configService = new ConfigService();
