import React from 'react';
import { useAuth } from '@/lib/providers/AuthProvider';
import SignInForm from '@/components/auth/SignInForm';

interface SignInPageProps {
  redirectUrl?: string;
}

const SignInPage: React.FC<SignInPageProps> = ({ redirectUrl }) => {
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSignIn = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      
      // Redirect after successful sign in
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
        <SignInForm onSubmit={handleSignIn} redirectUrl={redirectUrl} />
      </div>
    </div>
  );
};

export default SignInPage;
