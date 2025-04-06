"use client";

import { NextPage } from 'next';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { RecommendationProvider } from '@/lib/ai/RecommendationContext';
import dynamic from 'next/dynamic';

// Use dynamic import for client components
const HomePageClient = dynamic(() => import('./page.client'));

const HomePage: NextPage = () => {
  return (
    <AuthProvider>
      <RecommendationProvider>
        <HomePageClient />
      </RecommendationProvider>
    </AuthProvider>
  );
};

export default HomePage;
