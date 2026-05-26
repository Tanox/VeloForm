'use client';

import { Configuration, ConfigComponent } from '@/types';
import { APP_CONSTANTS } from './constants';

// Helper function to check if Firebase is configured
function isFirebaseConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  return !!(projectId && projectId !== 'YOUR_PROJECT_ID');
}

export async function saveConfigurationToFirebase(
  config: Configuration,
  userId?: string
): Promise<string> {
  // If Firebase isn't configured, return local id
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
    
    // Convert dates to serializable format for Firebase
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
    // Fallback to local id
    return config.id || `config_${Date.now()}`;
  }
}

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
    // Don't throw error for Firebase issues, just log
  }
}

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
