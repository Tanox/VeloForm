// src/app/services/config.service.ts v3.2.0 - Business logic for configuration management
import { onAuthStateChanged } from 'firebase/auth';
import { Configuration, ConfigComponent } from '../types';
import { auth, saveConfiguration, getUserConfigurations, deleteConfiguration, getComponentsFromDB } from './firebase';
import { notificationService } from './notification';
import { configStore } from './config.store';
import { t } from './i18n';

export class ConfigService {
  private authInitialized = false;

  initAuthListener() {
    if (this.authInitialized) return;
    this.authInitialized = true;

    onAuthStateChanged(auth, (user) => {
      configStore.setIsLoggedIn(!!user);
    });
  }

  async initializeApp() {
    this.initAuthListener();
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

    try {
      const newId = await saveConfiguration(config);
      configStore.setConfigId(newId);
      await this.refreshMyConfigs();
      return newId;
    } catch {
      return null;
    } finally {
      configStore.setIsSaving(false);
    }
  }

  async refreshMyConfigs() {
    const configs = await getUserConfigurations();
    configStore.setMyConfigs(configs);
  }

  async removeConfig(id: string): Promise<boolean> {
    try {
      await deleteConfiguration(id);
      await this.refreshMyConfigs();
      if (configStore.configId() === id) {
        configStore.resetToDefaults();
      }
      return true;
    } catch {
      return false;
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
    notificationService.info('Deployment initiated to Vercel (Mock). Production build triggered.', 4000);
  }
}

export const configService = new ConfigService();
