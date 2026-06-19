-- Veloform: Firebase → Supabase 迁移脚本
-- 日期: 2026-06-19
-- 描述: 完整的 PostgreSQL 表结构、行级安全策略（RLS）、索引

-- ============================================
-- 1. 扩展与架构
-- ============================================

-- 确保启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. 配置表（替代 Firestore 的 configurations 集合）
-- ============================================

CREATE TABLE IF NOT EXISTS public.configurations (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    bike_type text NOT NULL CHECK (bike_type IN ('Road', 'MTB', 'Fold')),
    name text NOT NULL CHECK (char_length(name) <= 200),
    components jsonb NOT NULL DEFAULT '[]'::jsonb,
    total_cost integer NOT NULL DEFAULT 0,
    estimated_weight integer NOT NULL DEFAULT 0,
    description text,
    tags text[] DEFAULT '{}',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- 3. 组件目录表（预留，用于公开的组件数据）
-- ============================================

CREATE TABLE IF NOT EXISTS public.components (
    id text PRIMARY KEY,
    category text NOT NULL,
    bike_type text NOT NULL,
    name text NOT NULL,
    brand text,
    model text,
    price integer NOT NULL DEFAULT 0,
    weight integer NOT NULL DEFAULT 0,
    description text,
    image_url text,
    specs jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================
-- 4. 自动更新时间戳触发器
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_configurations_updated_at ON public.configurations;
CREATE TRIGGER set_configurations_updated_at
    BEFORE UPDATE ON public.configurations
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_components_updated_at ON public.components;
CREATE TRIGGER set_components_updated_at
    BEFORE UPDATE ON public.components
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================
-- 5. 索引（查询性能优化）
-- ============================================

CREATE INDEX IF NOT EXISTS idx_configurations_user_id ON public.configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_configurations_bike_type ON public.configurations(bike_type);
CREATE INDEX IF NOT EXISTS idx_configurations_updated_at ON public.configurations(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_components_category ON public.components(category);
CREATE INDEX IF NOT EXISTS idx_components_bike_type ON public.components(bike_type);

-- ============================================
-- 6. 行级安全策略（RLS） —— 替代 Firestore Security Rules
-- ============================================

ALTER TABLE public.configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;

-- 6.1 configurations 表策略
-- 匿名/已认证用户可读（用于公开配置浏览）
DROP POLICY IF EXISTS "Configurations are publicly readable" ON public.configurations;
CREATE POLICY "Configurations are publicly readable"
    ON public.configurations FOR SELECT
    USING (true);

-- 仅已认证用户可插入，且必须归属到自己的 user_id
DROP POLICY IF EXISTS "Users can insert their own configurations" ON public.configurations;
CREATE POLICY "Users can insert their own configurations"
    ON public.configurations FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 仅配置所有者可更新自己的配置
DROP POLICY IF EXISTS "Users can update their own configurations" ON public.configurations;
CREATE POLICY "Users can update their own configurations"
    ON public.configurations FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- 仅配置所有者可删除自己的配置
DROP POLICY IF EXISTS "Users can delete their own configurations" ON public.configurations;
CREATE POLICY "Users can delete their own configurations"
    ON public.configurations FOR DELETE
    USING (auth.uid() = user_id);

-- 6.2 components 表策略（公开只读，不允许公开写入）
DROP POLICY IF EXISTS "Components are publicly readable" ON public.components;
CREATE POLICY "Components are publicly readable"
    ON public.components FOR SELECT
    USING (true);

-- ============================================
-- 7. 存储桶策略（如有图片/文件存储需求）
-- ============================================
-- 创建配置图片存储桶（如果需要使用 Supabase Storage）
-- INSERT INTO storage.buckets (id, name, public) VALUES ('config-images', 'config-images', true);

-- 存储桶访问策略
-- 允许已认证用户上传自己的配置图片
-- CREATE POLICY "Authenticated users can upload config images"
--     ON storage.objects FOR INSERT
--     TO authenticated
--     WITH CHECK (bucket_id = 'config-images');

-- 公开读取
-- CREATE POLICY "Config images are publicly readable"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'config-images');

-- ============================================
-- 8. 示例数据（可选，用于开发测试）
-- ============================================

-- 注：示例数据不在此脚本中插入，由应用默认配置生成
-- 见 src/lib/constants.ts 中的 getDefaultsForType() 函数

-- ============================================
-- 迁移完成
-- ============================================
