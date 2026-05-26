/**
 * @file firebase-service.ts
 * @version v3.4.0
 * @description Firebase 云存储服务模块
 * 
 * 提供配置和组件的云端持久化功能，支持以下特性：
 * - 配置保存、加载、删除操作
 * - 组件库云端同步
 * - 自动降级策略（Firebase 未配置时回退到本地存储）
 * - 静默错误处理，保证应用核心功能可用
 * 
 * @example
 * // 保存配置到 Firebase
 * const configId = await saveConfigurationToFirebase(config, userId);
 * 
 * @example
 * // 加载用户配置
 * const configs = await loadConfigurationsFromFirebase(userId);
 * 
 * @module firebase-service
 */

'use client';

import { Configuration, ConfigComponent } from '@/types';
import { APP_CONSTANTS } from './constants';

/**
 * Firebase 配置状态检查
 * 
 * 通过检查环境变量 `NEXT_PUBLIC_FIREBASE_PROJECT_ID` 来判断
 * Firebase 服务是否已正确配置。
 * 
 * 配置条件：
 * - 环境变量必须存在
 * - 不能是占位符值 "YOUR_PROJECT_ID"
 * 
 * @returns {boolean} Firebase 已配置返回 true，否则返回 false
 * 
 * @example
 * if (isFirebaseConfigured()) {
 *   console.log('Firebase 云服务可用');
 * }
 */
function isFirebaseConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  return !!(projectId && projectId !== 'YOUR_PROJECT_ID');
}

/**
 * 保存配置到 Firebase Firestore
 * 
 * 将配置对象持久化到云端 Firestore 数据库。如果 Firebase 未配置，
 * 会自动降级为返回本地 ID，确保应用功能不受影响。
 * 
 * 降级策略：
 * - 当 Firebase 未配置时，返回配置 ID 或生成时间戳 ID
 * - 保存失败时同样返回本地 ID，不抛出异常
 * 
 * 数据处理：
 * - 自动设置 `updatedAt` 为服务端时间戳
 * - 首次保存时自动设置 `createdAt`
 * - 如果配置已有 ID，则更新现有文档（merge 模式）
 * - 如果无 ID，则创建新文档并返回生成的文档 ID
 * 
 * @param {Configuration} config - 要保存的配置对象
 * @param {string} [userId] - 可选的用户 ID，用于关联配置归属
 * @returns {Promise<string>} 返回保存的文档 ID（云端或本地生成）
 * 
 * @example
 * // 保存新配置
 * const newConfig: Configuration = {
 *   name: 'My App Config',
 *   components: []
 * };
 * const id = await saveConfigurationToFirebase(newConfig);
 * 
 * @example
 * // 更新现有配置
 * const updatedConfig = { ...existingConfig, name: 'Updated Name' };
 * await saveConfigurationToFirebase(updatedConfig, 'user123');
 */
export async function saveConfigurationToFirebase(
  config: Configuration,
  userId?: string
): Promise<string> {
  if (!isFirebaseConfigured()) {
    console.log('Firebase not configured, using local only');
    return config.id || `config_${Date.now()}`;
  }

  try {
    const { db } = await import('./firebase');
    const { collection, doc, setDoc, serverTimestamp } = await import('firebase/firestore');
    
    if (!db) {
      throw new Error('Firebase not initialized');
    }

    const COLLECTIONS = APP_CONSTANTS.FIRESTORE_COLLECTIONS;
    
    const configData: any = {
      ...config,
      userId: userId || null,
      updatedAt: serverTimestamp(),
    };
    
    if (!config.createdAt) {
      configData.createdAt = serverTimestamp();
    } else if (config.createdAt instanceof Date) {
      configData.createdAt = config.createdAt;
    }

    if (config.id) {
      await setDoc(doc(db, COLLECTIONS.configurations, config.id), configData, {
        merge: true,
      });
      return config.id;
    } else {
      const newDocRef = doc(collection(db, COLLECTIONS.configurations));
      await setDoc(newDocRef, configData);
      return newDocRef.id;
    }
  } catch (error) {
    console.error('Error saving configuration to Firebase:', error);
    return config.id || `config_${Date.now()}`;
  }
}

/**
 * 从 Firebase 加载配置列表
 * 
 * 从 Firestore 数据库获取配置数据。支持按用户 ID 筛选，
 * 也可以获取所有配置（无 userId 时）。
 * 
 * 降级策略：
 * - Firebase 未配置或数据库未初始化时返回空数组
 * - 加载失败时静默返回空数组，不影响应用运行
 * 
 * 时间戳处理：
 * - 自动将 Firestore Timestamp 转换为 JavaScript Date 对象
 * - 如果时间戳不可用，使用当前日期作为默认值
 * 
 * @param {string} [userId] - 可选的用户 ID，指定时仅返回该用户的配置
 * @returns {Promise<Configuration[]>} 配置对象数组，无匹配时返回空数组
 * 
 * @example
 * // 加载当前用户的所有配置
 * const userConfigs = await loadConfigurationsFromFirebase('user123');
 * 
 * @example
 * // 加载所有配置（管理员场景）
 * const allConfigs = await loadConfigurationsFromFirebase();
 */
export async function loadConfigurationsFromFirebase(
  userId?: string
): Promise<Configuration[]> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    const { db } = await import('./firebase');
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    
    if (!db) {
      return [];
    }

    const COLLECTIONS = APP_CONSTANTS.FIRESTORE_COLLECTIONS;
    
    let q;
    if (userId) {
      q = query(
        collection(db, COLLECTIONS.configurations),
        where('userId', '==', userId)
      );
    } else {
      q = collection(db, COLLECTIONS.configurations);
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
    })) as Configuration[];
  } catch (error) {
    console.error('Error loading configurations from Firebase:', error);
    return [];
  }
}

/**
 * 从 Firebase 删除配置
 * 
 * 从 Firestore 数据库中删除指定的配置文档。
 * 
 * 降级策略：
 * - Firebase 未配置时直接返回，不执行任何操作
 * - 删除失败时静默处理，不抛出异常
 * 
 * @param {string} configId - 要删除的配置文档 ID
 * @returns {Promise<void>} 删除操作完成（不保证成功）
 * 
 * @example
 * // 删除指定配置
 * await deleteConfigurationFromFirebase('config_abc123');
 */
export async function deleteConfigurationFromFirebase(
  configId: string
): Promise<void> {
  if (!isFirebaseConfigured()) {
    return;
  }

  try {
    const { db } = await import('./firebase');
    const { doc, deleteDoc } = await import('firebase/firestore');
    
    if (!db) {
      return;
    }

    const COLLECTIONS = APP_CONSTANTS.FIRESTORE_COLLECTIONS;
    await deleteDoc(doc(db, COLLECTIONS.configurations, configId));
  } catch (error) {
    console.error('Error deleting configuration from Firebase:', error);
  }
}

/**
 * 从 Firebase 加载组件库
 * 
 * 从 Firestore 的 components 集合获取预定义的配置组件列表。
 * 用于同步云端组件库到本地应用。
 * 
 * 降级策略：
 * - Firebase 未配置或数据库未初始化时返回空数组
 * - 加载失败时静默返回空数组，不影响应用运行
 * 
 * @returns {Promise<ConfigComponent[]>} 组件对象数组，无数据时返回空数组
 * 
 * @example
 * // 获取云端组件库
 * const components = await loadComponentsFromFirebase();
 * console.log(`加载了 ${components.length} 个组件`);
 */
export async function loadComponentsFromFirebase(): Promise<ConfigComponent[]> {
  if (!isFirebaseConfigured()) {
    return [];
  }

  try {
    const { db } = await import('./firebase');
    const { collection, getDocs } = await import('firebase/firestore');
    
    if (!db) {
      return [];
    }

    const COLLECTIONS = APP_CONSTANTS.FIRESTORE_COLLECTIONS;
    const snapshot = await getDocs(collection(db, COLLECTIONS.components));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConfigComponent[];
  } catch (error) {
    console.error('Error loading components from Firebase:', error);
    return [];
  }
}
