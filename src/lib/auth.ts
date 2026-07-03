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

// --- 安全防护常量 ---
const MIN_PASSWORD_LENGTH = 8;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60_000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 简易客户端速率限制（防暴力破解）：记录失败次数与锁定到期时间
interface RateLimitState {
  attempts: number;
  lockedUntil: number;
}
const loginRateLimit: RateLimitState = { attempts: 0, lockedUntil: 0 };

function validateCredentials(email: string, password: string): void {
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new Error('请输入有效的邮箱地址');
  }
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`密码长度至少为 ${MIN_PASSWORD_LENGTH} 位`);
  }
}

function checkRateLimit(): void {
  const now = Date.now();
  if (now < loginRateLimit.lockedUntil) {
    const remainingSec = Math.ceil((loginRateLimit.lockedUntil - now) / 1000);
    throw new Error(`尝试次数过多，请 ${remainingSec} 秒后再试`);
  }
}

function recordFailedAttempt(): void {
  loginRateLimit.attempts += 1;
  if (loginRateLimit.attempts >= MAX_LOGIN_ATTEMPTS) {
    loginRateLimit.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    loginRateLimit.attempts = 0;
    authLogger.warn('登录失败次数过多，已临时锁定 60 秒');
  }
}

function resetRateLimit(): void {
  loginRateLimit.attempts = 0;
  loginRateLimit.lockedUntil = 0;
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
  validateCredentials(email, password);
  checkRateLimit();

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
      recordFailedAttempt();
      // 统一错误信息，避免泄露用户是否存在
      throw new Error('邮箱或密码错误');
    }

    resetRateLimit();
    return {
      uid: data.user.id,
      email: data.user.email ?? null,
    };
  } catch (error) {
    // 重新抛出我们主动抛出的脱敏错误，避免被外层误处理
    if (error instanceof Error && error.message === '邮箱或密码错误') {
      throw error;
    }
    recordFailedAttempt();
    authLogger.error('Email login error:', error);
    throw new Error('邮箱或密码错误');
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
    const redirectTo =
      typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: redirectTo ? { redirectTo } : undefined,
    });

    if (error) {
      authLogger.error('Google login error:', error);
      throw new Error('Google 登录失败，请重试');
    }
  } catch (error) {
    authLogger.error('Google login error:', error);
    if (error instanceof Error && error.message === 'Google 登录失败，请重试') {
      throw error;
    }
    throw new Error('Google 登录失败，请重试');
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
  validateCredentials(email, password);

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
      // 注册场景错误信息相对可披露（如邮箱已注册），但仍统一为友好提示
      throw new Error('注册失败，该邮箱可能已被注册');
    }

    return {
      uid: data.user.id,
      email: data.user.email ?? null,
    };
  } catch (error) {
    if (error instanceof Error && error.message === '注册失败，该邮箱可能已被注册') {
      throw error;
    }
    authLogger.error('Sign up error:', error);
    throw new Error('注册失败，该邮箱可能已被注册');
  }
};
