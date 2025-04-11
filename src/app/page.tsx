'use client'

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useToast } from "@/components/ui/use-toast"
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import About from '@/components/About';

export default function Home() {
  const { toast } = useToast()

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <About />
    </div>
  );
} 