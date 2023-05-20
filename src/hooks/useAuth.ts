'use client';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<Session | null>(null);

  const getAuth = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setAuth(data.session);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return { loading, auth };
};

export default useAuth;
