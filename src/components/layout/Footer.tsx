'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Bike, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  产品: [
    { label: '功能', href: '#' },
    { label: '定价', href: '#' },
    { label: '更新日志', href: '#' },
    { label: '路线图', href: '#' },
  ],
  公司: [
    { label: '关于我们', href: '#' },
    { label: '博客', href: '#' },
    { label: '招聘', href: '#' },
    { label: '联系我们', href: '#' },
  ],
  资源: [
    { label: '文档', href: '#' },
    { label: 'API 参考', href: '#' },
    { label: '社区', href: '#' },
    { label: '帮助中心', href: '#' },
  ],
  法律: [
    { label: '隐私政策', href: '#' },
    { label: '服务条款', href: '#' },
    { label: '安全说明', href: '#' },
    { label: 'Cookie 设置', href: '#' },
  ],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-surface-secondary/50 border-t border-border-light relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            {/* 品牌区域 */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-display font-bold text-foreground">Veloform</span>
                </div>
                <p className="text-sm text-secondary mb-6 max-w-[280px] leading-relaxed">
                  为骑行爱好者打造的专业自行车配置平台，让每一辆车都独一无二。
                </p>

                {/* 社交链接 */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="relative w-10 h-10 rounded-xl bg-surface-tertiary/50 hover:bg-primary/10 border border-border-light hover:border-primary/30 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 group"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 链接区域 */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <li key={link.label}>
                      <motion.a
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors"
                        whileHover={{ x: 2 }}
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 底部栏 */}
        <div className="py-6 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-secondary">
                © 2024 Veloform. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-6">
              {['隐私政策', '服务条款', 'Cookie 设置'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-sm text-secondary hover:text-foreground transition-colors"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
