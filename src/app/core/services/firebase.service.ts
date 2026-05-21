// src/app/core/services/firebase.service.ts v3.4.0
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { FirebaseConfig } from '../models/types';
import fallbackConfig from '../../../../firebase-applet-config.json';

/**
 * Firebase 初始化服务
 * 负责 Firebase 应用的初始化和认证
 */
class FirebaseService {
  private _config: FirebaseConfig;
  private _app: ReturnType<typeof initializeApp> | null = null;
  private _initialized = false;

  constructor() {
    this._config = this.loadConfig();
  }

  private loadConfig(): FirebaseConfig {
    const getEnv = (key: string): string | undefined => {
      try {
        // 尝试从 import.meta.env 读取
        const env = (import.meta as { env?: Record<string, string> }).env || {};
        const val = env[key];
        if (val && val.trim()) {
          return val;
        }
      } catch {
        // 如果失败，继续尝试其他方式
      }
      
      try {
        // 尝试从 process.env 读取（用于 Node.js/SSR 环境）
        if (typeof process !== 'undefined' && process.env) {
          const val = process.env[key];
          if (val && val.trim()) {
            return val;
          }
        }
      } catch {
        // 如果失败，回退到默认配置
      }
      
      return undefined;
    };

    return {
      projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || fallbackConfig.projectId,
      appId: getEnv('VITE_FIREBASE_APP_ID') || fallbackConfig.appId,
      apiKey: getEnv('VITE_FIREBASE_API_KEY') || fallbackConfig.apiKey,
      authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || fallbackConfig.authDomain,
      firestoreDatabaseId: getEnv('VITE_FIRESTORE_DATABASE_ID') || fallbackConfig.firestoreDatabaseId,
      storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || fallbackConfig.storageBucket,
      messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || fallbackConfig.messagingSenderId,
      measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID') || fallbackConfig.measurementId,
    };
  }

  get app() {
    if (!this._app) {
      this._app = initializeApp(this._config);
      this._initialized = true;
    }
    return this._app;
  }

  get config(): FirebaseConfig {
    return this._config;
  }

  get auth() {
    return getAuth(this.app);
  }

  get isInitialized(): boolean {
    return this._initialized;
  }

  async loginWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result.user;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}

export const firebaseService = new FirebaseService();

export const auth = firebaseService.auth;

export { FirebaseService };
