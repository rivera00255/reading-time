'use client';
import ReportViewer from '@/components/Viewer';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

const Report = async () => {
  const param = useParams();
  const router = useRouter();
  // console.log(param);

  const { data, error } = await supabase.from('bookreport').select().eq('id', `${param.id}`);
  // console.log(data);

  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12">
        {data && (
          <div className="border bg-white px-8 py-10 rounded drop-shadow">
            <div className="min-h-50vh">
              <h3>{data[0].title}</h3>
              <h4 className="text-sm">{`${data[0].author} ${[data[0].publisher]}`}</h4>
              <hr className="my-2" />
              <ReportViewer report={data[0].report} />
            </div>
            <div className="flex items-center justify-end mt-4">
              <button
                className="bg-violet-50 px-4 py-1 text-xs rounded text-zinc-400"
                onClick={() => router.push(`../mypage/report/${param.id}/edit`)}>
                수정/삭제
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Report;
