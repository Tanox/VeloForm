'use client';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';
import { app } from './firebase';

// Initialize Firebase Auth
const auth: Auth | null = app ? getAuth(app) : null;
const googleProvider = new GoogleAuthProvider();

/**
 * Sign in with Google popup
 * @returns Promise<User> - The authenticated user
 */
export const loginWithGoogle = async (): Promise<User> => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Google login error:', error);
    throw error;
  }
};

/**
 * Sign out current user
 */
export const logout = async (): Promise<void> => {
  if (!auth) {
    throw new Error('Firebase Auth not initialized');
  }

  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

/**
 * Subscribe to authentication state changes
 * @param callback - Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  if (!auth) {
    console.warn('Firebase Auth not initialized, auth state subscription skipped');
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
};

/**
 * Get current authenticated user (synchronous)
 * @returns User | null - Current user or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  if (!auth) {
    return null;
  }
  return auth.currentUser;
};

export { auth };
