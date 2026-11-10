-- Veloform: 修正配置表数值精度与补齐约束
-- 日期: 2026-11-10
-- 描述: total_cost / estimated_weight 原为 integer，运行时重量为小数（如 5.64kg），
--       写入会被取整导致云端读回数据失真；同时补齐非负 CHECK 与策略角色限制。

-- 1. 数值精度（integer -> numeric，无损转换，幂等）
ALTER TABLE public.configurations
    ALTER COLUMN total_cost TYPE numeric(12, 2),
    ALTER COLUMN estimated_weight TYPE numeric(10, 2);

-- 2. 数据完整性约束（先删同名约束以支持重复执行）
ALTER TABLE public.configurations
    DROP CONSTRAINT IF EXISTS configurations_total_cost_non_negative,
    ADD CONSTRAINT configurations_total_cost_non_negative CHECK (total_cost >= 0),
    DROP CONSTRAINT IF EXISTS configurations_estimated_weight_non_negative,
    ADD CONSTRAINT configurations_estimated_weight_non_negative CHECK (estimated_weight >= 0);

-- 3. RLS 策略限定为 authenticated 角色，避免 PUBLIC 角色产生额外攻击面
DROP POLICY IF EXISTS "Users can read their own configurations" ON public.configurations;
CREATE POLICY "Users can read their own configurations"
    ON public.configurations FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own configurations" ON public.configurations;
CREATE POLICY "Users can insert their own configurations"
    ON public.configurations FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own configurations" ON public.configurations;
CREATE POLICY "Users can update their own configurations"
    ON public.configurations FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own configurations" ON public.configurations;
CREATE POLICY "Users can delete their own configurations"
    ON public.configurations FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);
