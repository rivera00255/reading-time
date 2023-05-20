'use client';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';

const MyPage = () => {
  const { loading, auth } = useAuth();

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
        <Link href="../bookreport">
          <button>독후감 작성하기</button>
        </Link>
        <div>나의 독후감들</div>
      </section>
    </main>
  );
};

export default MyPage;
