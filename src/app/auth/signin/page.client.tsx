import React from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import SignInForm from '@/components/auth/SignInForm';
import { useForm } from 'react-hook-form';

interface SignInPageProps {
  redirectUrl?: string;
}

const SignInPage: React.FC<SignInPageProps> = ({ redirectUrl }) => {
  const { signIn } = useAuth();
  const { handleSubmit } = useForm();
  
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      
      // Redirect after successful sign in
      const redirectTo = redirectUrl || '/';
      window.location.href = redirectTo;
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignInForm onSubmit={handleSignIn} redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default SignInPage;
