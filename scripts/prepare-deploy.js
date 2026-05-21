#!/usr/bin/env node
/**
 * 部署前准备脚本
 * 用于处理环境变量配置
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 准备部署配置...');

// 读取 firebase-applet-config.json
const configPath = path.join(__dirname, '../firebase-applet-config.json');

try {
  const config = require(configPath);
  console.log('✅ 当前 Firebase 配置:', JSON.stringify(config, null, 2));
  
  console.log('\n📝 部署前请确认：');
  console.log('1. 在部署平台设置所有必要的环境变量');
  console.log('2. 参考 .env.example 文件中的变量名');
  console.log('3. 如果环境变量未设置，将使用 firebase-applet-config.json 中的默认值');
  
  console.log('\n✅ 部署准备完成！');
} catch (error) {
  console.error('❌ 配置文件读取失败:', error.message);
}
