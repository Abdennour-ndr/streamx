"use client";

import React, { Suspense } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Use dynamic import for client components
const SignInPageClient = dynamic(() => import('./page.client'));

// Loading component for Suspense
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-white">Loading...</p>
    </div>
  </div>
);

const SignInPage: NextPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignInPageContent />
    </Suspense>
  );
};

const SignInPageContent = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || undefined;
  
  return <SignInPageClient redirectUrl={redirectUrl} />;
};

export default SignInPage;
