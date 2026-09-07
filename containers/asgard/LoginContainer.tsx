'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAsgardAuth } from '@/context/AsgardAuthContext';
import { AsgardAuthGuard } from '@/components/asgard/AsgardAuthGuard';
import { SupabaseConfigBanner } from '@/components/asgard/SupabaseConfigBanner';

import Image from 'next/image';

export const LoginContainer: React.FC = () => {
  const { signIn } = useAsgardAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      const res = await signIn(cleanEmail, password);
      if (res.success) {
        router.replace('/asgard/overview');
      }
    } catch (err: any) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AsgardAuthGuard requireAuth={false}>
      <div className="min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 overflow-hidden select-none">
        {/* Ambient background glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center">
            <Link href="/" className="group flex flex-col items-center">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-xl shadow-black/30 border border-white/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <Image
                  src="/assets/web/l2-svg.svg"
                  alt="L2 Global Technologies"
                  width={160}
                  height={40}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[11px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 backdrop-blur-xs">
                CMS DASHBOARD
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white text-center">
              Welcome back
            </h2>
            <p className="mt-1.5 text-xs text-slate-400 text-center max-w-xs leading-relaxed">
              Sign in to manage blogs, services catalog, and website assets.
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-7 sm:mx-auto sm:w-full sm:max-w-md px-4">
          <SupabaseConfigBanner />

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/40 border border-slate-100/90">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Email field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="admin@asgard.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs text-slate-900 bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/15 focus:border-indigo-500 hover:border-slate-300 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-800">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs text-slate-900 bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-3 focus:ring-indigo-500/15 focus:border-indigo-500 hover:border-slate-300 transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                    tabIndex={-1}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] rounded-xl transition-all shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/35 disabled:opacity-60 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign in to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Footer info */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Supabase Auth
              </span>
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
              >
                Back to website &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AsgardAuthGuard>
  );
};
