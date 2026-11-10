-- Veloform: 强化 configurations 表 RLS 读取策略
-- 日期: 2026-07-18
-- 描述: 将 configurations 表 SELECT 策略从公开可读收紧为仅所有者可读，
--       消除任意用户（含 anon key）读取他人配置（名称/组件/价格）的隐私泄露风险（IDOR）。
--       INSERT / UPDATE / DELETE 已要求 auth.uid() = user_id，本迁移与之一致。

-- 移除初始 schema 中已创建的读取策略（按实际名称删除，保证迁移可重复执行）
DROP POLICY IF EXISTS "Users can read their own configurations" ON public.configurations;

-- 新建：仅配置所有者可读自己的配置（与初始 schema 保持一致，避免全新库执行时报“策略已存在”）
CREATE POLICY "Users can read their own configurations"
    ON public.configurations FOR SELECT
    USING (auth.uid() = user_id);
