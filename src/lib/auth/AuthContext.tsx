import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  profileImage?: string;
  isCreator: boolean;
  subscriptionTier: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session with the backend
        const storedUser = localStorage.getItem('streamx-user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to authenticate
      // Mock authentication for demo purposes
      const mockUser: User = {
        id: 'usr_123',
        username: email.split('@')[0],
        email,
        isCreator: false,
        subscriptionTier: 'free'
      };
      
      setUser(mockUser);
      localStorage.setItem('streamx-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would make an API call to register
      // Mock registration for demo purposes
      const mockUser: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        username,
        email,
        isCreator: false,
        subscriptionTier: 'free'
      };
      
      setUser(mockUser);
      localStorage.setItem('streamx-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('streamx-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
