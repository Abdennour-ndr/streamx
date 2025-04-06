import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

interface SignUpPageProps {
  redirectUrl?: string;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ redirectUrl }) => {
  const { signUp } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSignUp = async (username: string, email: string, password: string) => {
    setIsSubmitting(true);
    try {
      await signUp(username, email, password);
      
      // Redirect after successful sign up
      const redirectTo = redirectUrl || '/';
      window.location.href = redirectTo;
    } catch (error) {
      setIsSubmitting(false);
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
