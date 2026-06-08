'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Cta } from '@/components/sections/Cta';

export default function Home() {
  const handleNavigate = (page: string) => {
    console.log('Navigate to:', page);
  };

  return (
    <div className="min-h-screen noise-bg">
      <div className="gradient-mesh" />
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <Features />
        <Pricing />
        <Cta />
      </main>
      
      <Footer />
    </div>
  );
}