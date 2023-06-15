'use client';
// import ReportEditor from '@/components/Editor';
import { AuthContext } from '@/lib/Supabase/AuthProvider';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

const ReportEditor = dynamic(() => import('@/components/Editor'), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const BookReport = () => {
  // const { loading, auth } = useAuth();

  // if (!loading && !auth) return <NotFound />;

  const auth = useContext(AuthContext);
  // console.log(auth);

  // if (!auth) return <NotFound />;
  return (
    <main>
      <div className="container xl mx-auto px-4 mt-8 mb-12">
        <h3 className="my-8">나의 독후감</h3>
        {auth && <ReportEditor user={auth.user.email ?? ''} />}
      </div>
    </main>
  );
};

export default BookReport;
