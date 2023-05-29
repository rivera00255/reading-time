'use client';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/Supabase/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyPage = () => {
  const router = useRouter();
  const { loading, auth } = useAuth();
  const [report, setReport] = useState<{ [key: string]: any }[]>([]);
  const [profile, setProfile] = useState('');

  const getBookReport = async (user: string) => {
    const { data, error } = await supabase
      .from('bookreport')
      .select('id, title, createdAt')
      .eq('user', `${user}`)
      .order('createdAt', { ascending: false });
    // console.log(data);
    // console.log(error);
    if (data) setReport(data);
  };

  const getProfile = async (id: string) => {
    try {
      const { data, error } = await supabase.storage.from('profile').list(`${id}`, {
        search: 'profile',
      });
      if (data && data.length > 0) {
        const { data } = supabase.storage.from('profile').getPublicUrl(`${id}/profile`);
        data && setProfile(data.publicUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!loading && auth) {
      getBookReport(auth.user.email ?? '');
      getProfile(auth.user.id);
    }
  }, [loading, auth]);

  if (loading)
    return <div className="container xl mx-auto px-4 min-h-50vh flex justify-center items-center">Loading...</div>;
  if (!auth)
    return (
      <div className="container xl mx-auto px-4 min-h-50vh flex justify-center items-center">
        <div className="border rounded p-8 text-center">
          <p className="mb-2">로그인 후 이용해주세요.</p>
          <Link href="../login">
            <button className="bg-zinc-200 px-2 py-1 rounded text-sm">로그인 페이지로 이동</button>
          </Link>
        </div>
      </div>
    );
  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12">
        <div className="flex items-center justify-center my-5">
          <Link href="../mypage/profile">
            <div className="w-24 h-24 bg-violet-200 rounded-full drop-shadow-sm overflow-hidden">
              {profile !== '' && <Image src={profile} alt="profile" fill={true} sizes="100%" />}
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center my-8">
          <button className="bg-violet-400 py-2 px-4 rounded text-sm text-white hover:bg-violet-300">
            <Link href="../bookreport">독후감 작성하기</Link>
          </button>
        </div>
        <div className="min-h-50vh">
          {report.length > 0 &&
            report.map((item) => (
              <div
                key={item.id}
                className="bg-violet-50 py-4 px-8 rounded drop-shadow mb-4 flex items-center justify-between hover:bg-violet-100"
                onClick={() => {
                  router.push(`../mypage/report/${item.id}`);
                }}>
                <p>{item.title}</p>
                <p className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default MyPage;
