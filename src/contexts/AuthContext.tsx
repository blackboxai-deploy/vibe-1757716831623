'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState } from '@/lib/types';
import { 
  getCurrentUser, 
  saveUserSession, 
  clearUserSession, 
  validateLogin, 
  registerUser,
  updateUserProfile,
  updateLastActivity
} from '@/lib/auth';

const AuthContext = createContext<AuthState | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user session on mount
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Update last activity periodically
    const interval = setInterval(() => {
      if (currentUser) {
        updateLastActivity();
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const authenticatedUser = validateLogin(username, password);
      
      if (authenticatedUser) {
        // Update user status to online
        const updatedUser = { ...authenticatedUser, status: 'online' as const, lastSeen: new Date() };
        updateUserProfile(authenticatedUser.id, { status: 'online', lastSeen: new Date() });
        
        setUser(updatedUser);
        saveUserSession(updatedUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, displayName: string, password: string): Promise<boolean> => {
    try {
      const newUser = registerUser(username, displayName, password);
      
      if (newUser) {
        setUser(newUser);
        saveUserSession(newUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    if (user) {
      // Update user status to offline before logging out
      updateUserProfile(user.id, { status: 'offline', lastSeen: new Date() });
    }
    
    setUser(null);
    clearUserSession();
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = updateUserProfile(user.id, updates);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const authValue: AuthState = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};