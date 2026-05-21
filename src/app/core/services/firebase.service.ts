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
    const getEnv = (): Record<string, string> => {
      try {
        return (import.meta as { env?: Record<string, string> }).env || {};
      } catch {
        return {};
      }
    };

    const env = getEnv();
    const keys = [
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_APP_ID',
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIRESTORE_DATABASE_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_MEASUREMENT_ID'
    ] as const;

    const getVal = (key: string) => {
      const val = env[key];
      return val || undefined;
    };

    return {
      projectId: getVal(keys[0]) || fallbackConfig.projectId,
      appId: getVal(keys[1]) || fallbackConfig.appId,
      apiKey: getVal(keys[2]) || fallbackConfig.apiKey,
      authDomain: getVal(keys[3]) || fallbackConfig.authDomain,
      firestoreDatabaseId: getVal(keys[4]) || fallbackConfig.firestoreDatabaseId,
      storageBucket: getVal(keys[5]) || fallbackConfig.storageBucket,
      messagingSenderId: getVal(keys[6]) || fallbackConfig.messagingSenderId,
      measurementId: getVal(keys[7]) || fallbackConfig.measurementId,
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
