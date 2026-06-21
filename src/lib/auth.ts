'use client';

/**
 * Supabase Auth 模块
 * 使用原生 supabase-js 的 auth API
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import { authLogger } from './logger';

export interface SupabaseUser {
  uid: string;
  email: string | null;
}

/**
 * 获取当前认证用户
 */
export const getCurrentUser = async (): Promise<SupabaseUser | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const client = getSupabaseClient();
    if (!client) return null;

    const { data: userData, error } = await client.auth.getUser();
    if (error || !userData.user) {
      return null;
    }

    return {
      uid: userData.user.id,
      email: userData.user.email ?? null,
    };
  } catch (error) {
    authLogger.error('Error getting current user:', error);
    return null;
  }
};

/**
 * 订阅认证状态变化
 * @param callback - 状态变化回调
 * @returns 取消订阅函数
 */
export const subscribeToAuthChanges = (
  callback: (user: SupabaseUser | null) => void
): (() => void) => {
  if (!isSupabaseConfigured()) {
    authLogger.warn('Supabase not configured, auth subscription skipped');
    return () => {};
  }

  const client = getSupabaseClient();
  if (!client) {
    return () => {};
  }

  const { data: subscription } = client.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        uid: session.user.id,
        email: session.user.email ?? null,
      });
    } else {
      callback(null);
    }
  });

  return () => {
    subscription.subscription.unsubscribe();
  };
};

/**
 * 使用邮箱密码登录
 */
export const loginWithEmail = async (email: string, password: string): Promise<SupabaseUser> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      authLogger.error('Email login error:', error);
      throw error || new Error('Login failed');
    }

    return {
      uid: data.user.id,
      email: data.user.email ?? null,
    };
  } catch (error) {
    authLogger.error('Email login error:', error);
    throw error;
  }
};

/**
 * 使用 Google OAuth 登录（弹出新窗口）
 */
export const loginWithGoogle = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      authLogger.error('Google login error:', error);
      throw error;
    }
  } catch (error) {
    authLogger.error('Google login error:', error);
    throw error;
  }
};

/**
 * 登出当前用户
 */
export const logout = async (): Promise<void> => {
  if (!isSupabaseConfigured()) {
    return;
  }

  const client = getSupabaseClient();
  if (!client) {
    return;
  }

  try {
    await client.auth.signOut();
  } catch (error) {
    authLogger.error('Logout error:', error);
    throw error;
  }
};

/**
 * 创建新账户（邮箱密码）
 */
export const signUpWithEmail = async (email: string, password: string): Promise<SupabaseUser> => {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase not configured');
  }

  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await client.auth.signUp({ email, password });

    if (error || !data.user) {
      authLogger.error('Sign up error:', error);
      throw error || new Error('Sign up failed');
    }

    return {
      uid: data.user.id,
      email: data.user.email ?? null,
    };
  } catch (error) {
    authLogger.error('Sign up error:', error);
    throw error;
  }
};
