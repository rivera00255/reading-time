'use client';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log(event, session);
      if (event === 'SIGNED_OUT') {
        setSession(null);
        return;
      }
      if (session) setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return session;
};

export default useSession;
