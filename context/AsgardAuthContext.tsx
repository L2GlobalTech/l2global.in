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

  // Initialize Auth State from Supabase
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          console.log("SUPABASE SESSION:", session);
          console.log("SUPABASE USER:", session?.user);

          const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();
          console.log("SUPABASE USER (getUser):", supabaseUser);

          console.log({
            authenticated: !!session,
            userId: session?.user?.id,
            email: session?.user?.email,
          });

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

          // If no active Supabase Auth session exists, clear local state
          if (isMounted) {
            setUser(null);
            Cookies.remove(ASGARD_ACCESS_TOKEN);
            localStorage.removeItem(ASGARD_ADMIN_INFO);
          }
        } else {
          console.warn("Supabase is not configured in environment");
          if (isMounted) setUser(null);
        }
      } catch (err) {
        console.error('Failed to initialize Asgard auth:', err);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    initAuth();

    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('SUPABASE AUTH STATE CHANGE:', event, {
            authenticated: !!session,
            userId: session?.user?.id,
            email: session?.user?.email,
          });

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
          } else if (event === 'SIGNED_OUT' || !session) {
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

  // Sign In Handler using Supabase Auth
  const signIn = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!isSupabaseConfigured()) {
        const errorMsg = 'Supabase credentials are not configured in environment variables.';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase signInWithPassword failed:', {
          message: error.message,
          details: (error as any).details,
          hint: (error as any).hint,
          code: (error as any).code,
        });
        toast.error(error.message || 'Invalid credentials');
        return { success: false, error: error.message };
      }

      if (data.session && data.user) {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("LOGIN SESSION:", session);

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

      return { success: false, error: 'Authentication failed' };
    } catch (err: any) {
      const msg = err?.message || 'Login error occurred';
      console.error('Exception during signIn:', err);
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
