import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useForm } from 'react-hook-form';

interface SignUpPageProps {
  redirectUrl?: string;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ redirectUrl }) => {
  const { signUp } = useAuth();
  const { handleSubmit } = useForm();
  
  const handleSignUp = async (username: string, email: string, password: string) => {
    try {
      await signUp(username, email, password);
      
      // Redirect after successful sign up
      const redirectTo = redirectUrl || '/';
      window.location.href = redirectTo;
    } catch (error) {
      throw error;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <SignUpForm onSubmit={handleSignUp} redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default SignUpPage;

// This is a client component that will be imported in the actual page file
import SignUpForm from '@/components/auth/SignUpForm';
