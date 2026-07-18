-- Veloform: 强化 configurations 表 RLS 读取策略
-- 日期: 2026-07-18
-- 描述: 将 configurations 表 SELECT 策略从公开可读收紧为仅所有者可读，
--       消除任意用户（含 anon key）读取他人配置（名称/组件/价格）的隐私泄露风险（IDOR）。
--       INSERT / UPDATE / DELETE 已要求 auth.uid() = user_id，本迁移与之一致。

-- 移除旧的无条件公开读取策略
DROP POLICY IF EXISTS "Configurations are publicly readable" ON public.configurations;

-- 新建：仅配置所有者可读自己的配置
CREATE POLICY "Users can read their own configurations"
    ON public.configurations FOR SELECT
    USING (auth.uid() = user_id);
