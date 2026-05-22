#!/usr/bin/env node
// deploy/scripts/prepare-deploy.js v3.4.0

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

function prepareDeploy() {
  console.log('🚀 Preparing deployment...');

  const vercelConfig = path.join(rootDir, 'deploy/vercel/vercel.json');
  const vercelTarget = path.join(rootDir, 'vercel.json');
  
  if (fs.existsSync(vercelConfig)) {
    fs.copyFileSync(vercelConfig, vercelTarget);
    console.log('✅ Copied vercel.json');
  }

  const edgeoneConfig = path.join(rootDir, 'deploy/edgeone/edgeone-pages.config.json');
  const edgeoneTarget = path.join(rootDir, 'edgeone-pages.config.json');
  
  if (fs.existsSync(edgeoneConfig)) {
    fs.copyFileSync(edgeoneConfig, edgeoneTarget);
    console.log('✅ Copied edgeone-pages.config.json');
  }

  const firebaseConfig = path.join(rootDir, 'deploy/firebase/firebase-applet-config.json');
  const firebaseTarget = path.join(rootDir, 'firebase-applet-config.json');
  
  if (fs.existsSync(firebaseConfig)) {
    fs.copyFileSync(firebaseConfig, firebaseTarget);
    console.log('✅ Copied firebase-applet-config.json');
  }

  const firestoreRules = path.join(rootDir, 'deploy/firebase/firestore.rules');
  const firestoreTarget = path.join(rootDir, 'firestore.rules');
  
  if (fs.existsSync(firestoreRules)) {
    fs.copyFileSync(firestoreRules, firestoreTarget);
    console.log('✅ Copied firestore.rules');
  }

  const envExample = path.join(rootDir, 'deploy/env.example');
  const envTarget = path.join(rootDir, '.env.example');
  
  if (fs.existsSync(envExample)) {
    fs.copyFileSync(envExample, envTarget);
    console.log('✅ Copied .env.example');
  }

  console.log('✨ Deployment preparation complete!');
}

prepareDeploy();
