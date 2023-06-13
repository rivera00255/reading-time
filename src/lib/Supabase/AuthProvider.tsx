'use client';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  //   const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Session | null>(null);

  const getAuth = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setAuth(data.session);
      //   setLoading(false);
    }
    // if (!loading) !auth && router.push('/');
  };

  useEffect(() => {
    getAuth();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
