'use client';

import { useEffect, useRef } from 'react';
import { useConfigStore } from '@/lib/store';
import { subscribeToAuthChanges } from '@/lib/auth';
import { loadConfigurationsFromFirebase } from '@/lib/firebase-service';

/**
 * SyncProvider handles authentication state subscription and cloud sync
 * It automatically loads user configurations when authenticated
 */
export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { setMyConfigs, setUserId } = useConfigStore();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    unsubscribeRef.current = subscribeToAuthChanges(async (user) => {
      if (user) {
        // User is signed in
        setUserId(user.uid);

        // Load user's configurations from Firebase
        try {
          const configs = await loadConfigurationsFromFirebase(user.uid);
          setMyConfigs(configs);
        } catch (error) {
          console.error('Failed to load configurations:', error);
        }
      } else {
        // User is signed out
        setUserId(null);
        setMyConfigs([]);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [setUserId, setMyConfigs]);

  return <>{children}</>;
}
