'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { ASGARD_ACCESS_TOKEN, ASGARD_ADMIN_INFO } from '@/configs/constants';
import toast from 'react-hot-toast';

export interface AsgardUser {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

interface AsgardAuthContextType {
  user: AsgardUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AsgardAuthContext = createContext<AsgardAuthContextType | undefined>(undefined);

export const AsgardAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AsgardUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Initialize Auth State from Cookies / LocalStorage or Supabase
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (session?.user && isMounted) {
            const authUser: AsgardUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: session.user.role || 'admin',
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
            };
            setUser(authUser);
            Cookies.set(ASGARD_ACCESS_TOKEN, session.access_token, { expires: 7 });
            localStorage.setItem(ASGARD_ADMIN_INFO, JSON.stringify(authUser));
            setLoading(false);
            return;
          }
        }

        // Fallback or local session check via Cookies
        const token = Cookies.get(ASGARD_ACCESS_TOKEN);
        const storedUser = localStorage.getItem(ASGARD_ADMIN_INFO);

        if (token && storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            if (isMounted) setUser(parsed);
          } catch {
            if (isMounted) setUser(null);
          }
        } else {
          if (isMounted) setUser(null);
        }
      } catch (err) {
        console.error('Failed to initialize Asgard auth:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            const authUser: AsgardUser = {
              id: session.user.id,
              email: session.user.email || '',
              role: session.user.role || 'admin',
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Admin',
            };
            setUser(authUser);
            Cookies.set(ASGARD_ACCESS_TOKEN, session.access_token, { expires: 7 });
            localStorage.setItem(ASGARD_ADMIN_INFO, JSON.stringify(authUser));
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            Cookies.remove(ASGARD_ACCESS_TOKEN);
            localStorage.removeItem(ASGARD_ADMIN_INFO);
          }
        }
      );

      return () => {
        isMounted = false;
        subscription?.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Sign In Handler
  const signIn = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message || 'Invalid credentials');
          return { success: false, error: error.message };
        }

        if (data.session && data.user) {
          const authUser: AsgardUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: data.user.role || 'admin',
            name: data.user.user_metadata?.full_name || email.split('@')[0] || 'Admin',
          };

          setUser(authUser);
          Cookies.set(ASGARD_ACCESS_TOKEN, data.session.access_token, { expires: 7 });
          localStorage.setItem(ASGARD_ADMIN_INFO, JSON.stringify(authUser));
          toast.success('Signed in successfully');
          return { success: true };
        }
      } else {
        // Standalone / Local fallback mode for demo
        const mockUser: AsgardUser = {
          id: 'demo-admin-id',
          email,
          role: 'admin',
          name: email.split('@')[0] || 'Admin',
        };

        const mockToken = 'asgard_demo_token_' + Date.now();
        Cookies.set(ASGARD_ACCESS_TOKEN, mockToken, { expires: 7 });
        localStorage.setItem(ASGARD_ADMIN_INFO, JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success('Signed in (Demo CMS mode)');
        return { success: true };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (err: any) {
      const msg = err?.message || 'Login error occurred';
      toast.error(msg);
      return { success: false, error: msg };
    }
  }, []);

  // Sign Out Handler
  const signOut = useCallback(async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setUser(null);
      Cookies.remove(ASGARD_ACCESS_TOKEN);
      localStorage.removeItem(ASGARD_ADMIN_INFO);
      toast.success('Signed out');
      router.push('/asgard/login');
    }
  }, [router]);

  return (
    <AsgardAuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AsgardAuthContext.Provider>
  );
};

export const useAsgardAuth = (): AsgardAuthContextType => {
  const context = useContext(AsgardAuthContext);
  if (!context) {
    throw new Error('useAsgardAuth must be used within an AsgardAuthProvider');
  }
  return context;
};

export default AsgardAuthProvider;
