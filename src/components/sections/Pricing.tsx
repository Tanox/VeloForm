'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: '个人版',
    description: '适合独立骑行爱好者',
    monthlyPrice: 29,
    yearlyPrice: 299,
    features: [
      '无限项目',
      '5GB 存储空间',
      '基础组件库',
      '社区模板库',
      '标准支持',
    ],
    popular: false,
    cta: '免费开始',
    gradient: 'from-slate-600 to-slate-700',
  },
  {
    name: '专业版',
    description: '适合专业骑手和小团队',
    monthlyPrice: 79,
    yearlyPrice: 799,
    features: [
      '无限项目',
      '100GB 存储空间',
      '高级组件库',
      '专属模板库',
      '优先支持',
      '团队协作功能',
      '配置导出',
    ],
    popular: true,
    cta: '立即升级',
    gradient: 'from-primary to-accent',
  },
  {
    name: '企业版',
    description: '适合车队和企业',
    monthlyPrice: 199,
    yearlyPrice: 1999,
    features: [
      '无限项目',
      '无限存储空间',
      '全套组件库',
      '定制模板库',
      '24/7 专属支持',
      '高级团队协作',
      '私有化部署',
      'SLA 保障',
    ],
    popular: false,
    cta: '联系销售',
    gradient: 'from-purple-600 to-pink-600',
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">定价方案</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            选择<span className="text-gradient-brand">适合</span>你的方案
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-10">
            灵活的定价策略，满足不同规模用户的需求
          </p>

          {/* 切换器 */}
          <div className="inline-flex items-center gap-4 p-1.5 bg-surface-secondary/80 backdrop-blur-sm rounded-full border border-border-light" role="tablist" aria-label="计费周期切换">
            <button
              role="tab"
              aria-selected={!isYearly}
              onClick={() => setIsYearly(false)}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                !isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              月付
            </button>
            <button
              role="tab"
              aria-selected={isYearly}
              onClick={() => setIsYearly(true)}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              年付
              <span className={`px-2 py-0.5 rounded-full text-xs ${isYearly ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}>
                省20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" role="list">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              role="listitem"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-3xl p-8 transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:outline-none ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/30'
                  : 'bg-surface-secondary/80 backdrop-blur-sm border border-border-light hover:border-primary/30'
              }`}
              aria-label={`${plan.name}方案`}
            >
              {/* 流行方案装饰 */}
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-primary rounded-full shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">最受欢迎</span>
                    </div>
                  </motion.div>
                </>
              )}

              {/* 卡片顶部渐变条 */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient} ${
                plan.popular ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'
              }`} />

              <div className={`mb-6 ${plan.popular ? 'text-white/90' : 'text-secondary'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {plan.popular && (
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <h3 className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                    {plan.name}
                  </h3>
                </div>
                <p className="text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                    ¥{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-secondary'}`}>
                    /{isYearly ? '年' : '月'}
                  </span>
                </div>
                {isYearly && (
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-muted'}`}>
                    每月仅需 ¥{Math.round(plan.yearlyPrice / 12)}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3" role="listitem">
                    <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-accent/10'} flex items-center justify-center flex-shrink-0 mt-0.5`} aria-hidden="true">
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-secondary'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full min-h-[44px]"
                variant={plan.popular ? 'secondary' : 'default'}
                size="lg"
                aria-label={`${plan.name}方案 - ${plan.cta}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* 底部保障 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted mt-12"
        >
          所有方案均包含 14 天全额退款保障，如有任何不满意，无需任何理由即可申请退款
        </motion.p>
      </div>
    </section>
  );
}
