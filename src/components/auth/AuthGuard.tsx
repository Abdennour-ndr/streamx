import React from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCreator?: boolean;
  requirePremium?: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  requireCreator = false,
  requirePremium = false
}) => {
  const { user, loading } = useAuth();
  const [redirecting, setRedirecting] = React.useState(false);

  React.useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        setRedirecting(true);
        window.location.href = '/auth/signin?redirect=' + encodeURIComponent(window.location.pathname);
      } else if (requireCreator && (!user || !user.isCreator)) {
        setRedirecting(true);
        window.location.href = '/creators/apply';
      } else if (requirePremium && (!user || user.subscriptionTier !== 'premium')) {
        setRedirecting(true);
        window.location.href = '/subscription/upgrade';
      }
    }
  }, [loading, user, requireAuth, requireCreator, requirePremium]);

  if (loading || redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requireCreator && (!user || !user.isCreator)) {
    return null;
  }

  if (requirePremium && (!user || user.subscriptionTier !== 'premium')) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
