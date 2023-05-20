'use client';
import useSession from '@/hooks/useSession';
import { supabase } from '@/lib/Supabase/supabaseClient';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  //   console.log(session);

  return (
    <ul className="absolute top-4 right-2 text-right">
      {session ? (
        <>
          <li className="flex items-center my-1">
            <p className="text-zinc-400 text-xs mr-2">{session.user?.email}</p>
            <Link href="../mypage">
              <button className="text-zinc-500 text-sm drop-shadow-sm hover:text-zinc-400">마이페이지</button>
            </Link>
          </li>
          <li className="p-1">
            <button
              className="text-zinc-500 text-sm drop-shadow-sm hover:text-zinc-400"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                if (!error) router.replace('/');
              }}>
              로그아웃
            </button>
          </li>
        </>
      ) : (
        !pathname.includes('mypage') && (
          <li>
            <Link href="../login">
              <button className="text-zinc-500 p-1 text-sm drop-shadow-sm hover:text-zinc-400">로그인</button>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default Navigation;
