'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Bike } from 'lucide-react';

const footerLinks = {
  产品: ['功能', '定价', '更新日志', '路线图'],
  公司: ['关于我们', '博客', '招聘', '联系我们'],
  资源: ['文档', 'API 参考', '社区', '帮助中心'],
  法律: ['隐私政策', '服务条款', '安全说明', 'Cookie 设置'],
};

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Bike className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-foreground">Veloform</span>
              </div>
              <p className="text-sm text-secondary mb-6 max-w-xs">
                为骑行爱好者打造的专业自行车配置平台，让每一辆车都独一无二。
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-full hover:bg-surface-tertiary transition-colors text-secondary hover:text-foreground"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-secondary hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="py-4 sm:py-6 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-sm text-secondary">
              © 2024 Veloform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
                服务条款
              </a>
              <a href="#" className="text-sm text-secondary hover:text-foreground transition-colors">
                Cookie 设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}