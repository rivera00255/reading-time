'use client';
// import ReportEditor from '@/components/Editor';
import NotFound from '@/components/NotFound';
import useAuth from '@/hooks/useAuth';
import { AuthContext } from '@/lib/Supabase/AuthProvider';
import { supabase } from '@/lib/Supabase/supabaseClient';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const ReportEditor = dynamic(() => import('@/components/Editor'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const Edit = () => {
  // const { loading, auth } = useAuth();
  const auth = useContext(AuthContext);
  const param = useParams();
  // console.log(param);

  const [report, setReport] = useState<{ [key: string]: any } | null>(null);

  const getReport = async () => {
    const { data, error } = await supabase.from('bookreport').select().eq('id', `${param.id}`);
    if (data) setReport({ ...data[0] });
  };

  useEffect(() => {
    getReport();
  }, []);

  // if (!auth) return <NotFound />;
  return (
    <main>
      <div className="container xl mx-auto px-4 mt-8 mb-12">
        {report && <ReportEditor user={auth?.user.email ?? ''} bookReport={report} />}
      </div>
    </main>
  );
};

export default Edit;
