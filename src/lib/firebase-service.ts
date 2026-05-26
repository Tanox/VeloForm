'use client';

import { db } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { Configuration, ConfigComponent } from '@/types';
import { APP_CONSTANTS } from './constants';

const COLLECTIONS = APP_CONSTANTS.FIRESTORE_COLLECTIONS;

export async function saveConfigurationToFirebase(
  config: Configuration,
  userId?: string
): Promise<string> {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    const configData = {
      ...config,
      userId: userId || null,
      updatedAt: serverTimestamp(),
      createdAt: config.createdAt || serverTimestamp(),
    };

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
    console.error('Error saving configuration:', error);
    throw error;
  }
}

export async function loadConfigurationsFromFirebase(
  userId?: string
): Promise<Configuration[]> {
  if (!db) {
    return [];
  }
  try {
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
    console.error('Error loading configurations:', error);
    return [];
  }
}

export async function deleteConfigurationFromFirebase(
  configId: string
): Promise<void> {
  if (!db) {
    throw new Error('Firebase not initialized');
  }
  try {
    await deleteDoc(doc(db, COLLECTIONS.configurations, configId));
  } catch (error) {
    console.error('Error deleting configuration:', error);
    throw error;
  }
}

export async function loadComponentsFromFirebase(): Promise<ConfigComponent[]> {
  if (!db) {
    return [];
  }
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.components));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ConfigComponent[];
  } catch (error) {
    console.error('Error loading components:', error);
    return [];
  }
}
