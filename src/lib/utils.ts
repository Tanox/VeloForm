import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 货币格式化 - 按设计系统规范使用 zh-CN 本地化
export function formatCurrency(value: number, currency = 'CNY'): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// 重量格式化 - 默认单位为 kg（来自 WEIGHT_CONVERSION_FACTOR 换算）
export function formatWeight(value: number, unit = 'kg'): string {
  return `${value.toFixed(2)} ${unit}`;
}

// 首字母大写 - 用于标签显示
export function capitalizeFirstLetter(str: string): string {
  if (!str || str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 获取类别图标颜色映射 - 按设计系统规范
export const CATEGORY_GRADIENTS: Record<string, string> = {
  Frame: 'from-blue-500 to-cyan-400',
  Drivetrain: 'from-purple-500 to-pink-400',
  Wheelset: 'from-emerald-500 to-teal-400',
  Suspension: 'from-amber-500 to-orange-400',
  Cockpit: 'from-red-500 to-rose-400',
  Tires: 'from-indigo-500 to-blue-400',
};
