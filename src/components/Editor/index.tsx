'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import EditorComponent from '@/lib/ToastEditor/editor';
import { useRef } from 'react';
import { Editor } from '@/lib/ToastEditor';
import { supabase } from '@/lib/Supabase/supabaseClient';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { create } from '@/store/slices/notifySlice';

const ReportEditor = ({ user, bookReport }: { user: string; bookReport?: { [key: string]: any } }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const publisherRef = useRef<HTMLInputElement>(null);
  const reportRef = useRef<Editor>(null);
  // console.log(bookReport);
  const id: number = bookReport?.id ?? 0;
  // console.log(id);

  const createReport = async (report: { [key: string]: any }) => {
    const { error } = await supabase.from('bookreport').insert(report);
    if (!error) {
      dispatch(create({ message: '작성 완료.' }));
      router.push('../mypage');
    }
  };

  const updateReport = async (report: { [key: string]: any }) => {
    const { error } = await supabase.from('bookreport').update(report).eq('id', report.id);
    if (!error) {
      dispatch(create({ message: '수정 완료.' }));
      router.push('../mypage');
    }
  };

  const deleteReport = async (id: number) => {
    const { error } = await supabase.from('bookreport').delete().eq('id', id);
    if (!error) dispatch(create({ message: '삭제 완료.' }));
    router.push('../mypage');
  };

  const handleSubmit = async () => {
    if (titleRef.current && reportRef.current) {
      const title = titleRef.current.value;
      const author = authorRef.current?.value;
      const publisher = publisherRef.current?.value;
      const content = reportRef.current.getInstance();
      if (title !== '' && content.getMarkdown().length > 0) {
        // console.log(title);
        // console.log(report);
        const report = content.getHTML();
        // const { error } = await supabase
        //   .from('bookreport')
        //   .insert({ title: title, author: author, publisher: publisher, report: report, user: user });
        // if (!error) alert('작성 완료되었습니다.');
        try {
          !bookReport
            ? createReport({ title, author, publisher, report, user })
            : updateReport({ title, author, publisher, report, user, id });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert('내용을 작성해주세요.');
      }
    }
  };

  return (
    <div className="bg-white px-8 py-10 rounded drop-shadow">
      <div className="text-sm mb-4">
        <label className="mb-2">
          <span className="mr-2">도서명</span>
          <input type="text" className="rounded p-1 border" ref={titleRef} defaultValue={bookReport?.title} />
        </label>
        <label className="mb-2">
          <span className="ml-8 mr-2">저 자</span>
          <input type="text" className="rounded p-1 border" ref={authorRef} defaultValue={bookReport?.author} />
        </label>
        <label className="mb-2">
          <span className="ml-8 mr-2">출판사</span>
          <input type="text" className="rounded p-1 border" ref={publisherRef} defaultValue={bookReport?.publisher} />
        </label>
      </div>
      <EditorComponent
        initialValue={bookReport?.report || '내용을 작성해주세요.'}
        previewStyle="vertical"
        height="480px"
        initialEditType={!bookReport ? 'markdown' : 'wysiwyg'}
        language="ko-KR"
        toolbarItems={[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'], ['link']]}
        useCommandShortcut={true}
        usageStatistics={false}
        ref={reportRef}
      />
      <div className="flex justify-center items-center mt-4">
        <button className="bg-violet-50 px-8 py-2 text-sm rounded hover:bg-violet-100" onClick={() => handleSubmit()}>
          {!bookReport ? '작성하기' : '수정하기'}
        </button>
        {bookReport && (
          <button
            className="bg-violet-50 px-8 py-2 ml-2 text-sm text-zinc-500 rounded hover:bg-violet-100"
            onClick={() => {
              if (confirm('정말 삭제하시겠습니까?')) deleteReport(id);
            }}>
            삭제하기
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportEditor;
