'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Cta() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* 外发光边框 */}
          <div className="absolute -inset-px bg-gradient-to-r from-primary/30 via-transparent to-accent/30 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-brand opacity-95" />

          {/* 动态光球 */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px]">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full bg-white/10 rounded-full blur-3xl"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px]">
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
              <Sparkles className="w-4 h-4 text-white/80" />
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
              <span className="bg-white/20 bg-clip-text text-transparent">配置你的梦想之车</span>
              了吗？
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/80 max-w-xl mx-auto mb-10"
            >
              加入超过 100,000 名骑行爱好者的行列，打造专属于你的完美座驾
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-primary bg-white overflow-hidden shadow-lg shadow-white/20 transition-all duration-300"
              >
                <span className="relative flex items-center gap-2 group-hover:gap-3 transition-all">
                  免费开始
                  <ArrowRight className="w-5 h-5" />
                </span>
              </motion.button>

              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                了解更多
              </Button>
            </motion.div>

            {/* 底部装饰 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 text-white/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                无需信用卡
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                随时取消
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
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
