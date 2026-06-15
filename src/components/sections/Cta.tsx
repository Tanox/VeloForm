'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Cta() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* 外发光边框 */}
          <div className="absolute -inset-px bg-gradient-to-r from-primary/30 via-transparent to-accent/30 rounded-3xl" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-brand opacity-95" aria-hidden="true" />

          {/* 动态光球 */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px]" aria-hidden="true">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-white/10 rounded-full blur-3xl"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px]" aria-hidden="true">
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-accent/30 rounded-full blur-3xl"
            />
          </div>

          {/* 内容 */}
          <div className="relative z-10 text-center py-16 sm:py-20 px-6 sm:px-12">
            {/* 标签 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-white/80" aria-hidden="true" />
              <span className="text-sm font-medium text-white/90">免费试用，无需信用卡</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
            >
              准备好开始
              <br />
              配置你的梦想之车
              了吗？
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/80 max-w-xl mx-auto mb-10"
            >
              加入超过 100,000 名骑行爱好者的行列
            </motion.p>

            {/* 按钮组 - 使用 shadcn Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 rounded-2xl font-semibold text-primary bg-white min-h-[56px] hover:bg-white/90 hover:text-primary shadow-lg shadow-black/10"
                  aria-label="免费开始使用"
                >
                  免费开始
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Button>
              </motion.div>

              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/20 min-h-[56px] rounded-2xl"
                aria-label="了解更多"
              >
                了解更多
              </Button>
            </motion.div>

            {/* 底部装饰 - 特点列表 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 text-white/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                无需信用卡
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                随时取消
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                终身免费版
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
