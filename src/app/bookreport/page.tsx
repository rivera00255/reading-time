'use client';
import ReportEditor from '@/components/Editor';
import NotFound from '@/components/NotFound';
import useAuth from '@/hooks/useAuth';
import { AuthContext } from '@/lib/Supabase/AuthProvider';
import { useContext } from 'react';

const BookReport = () => {
  // const { loading, auth } = useAuth();

  // if (!loading && !auth) return <NotFound />;

  const auth = useContext(AuthContext);
  // console.log(auth);

  if (!auth) return <NotFound />;
  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12">
        <h3 className="my-8">나의 독후감</h3>
        <ReportEditor user={auth?.user.email ?? ''} />
      </section>
    </main>
  );
};

export default BookReport;
