'use client';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import EditorComponent from '@/lib/ToastEditor/editor';

const Editor = () => {
  return (
    <div className="bg-white px-8 py-10 rounded drop-shadow">
      <div className="text-sm mb-4">
        <label className="mb-2">
          <span className="mr-2">도서명</span>
          <input type="text" className="rounded p-1 border" />
        </label>
        <label className="mb-2">
          <span className="ml-8 mr-2">저 자</span>
          <input type="text" className="rounded p-1 border" />
        </label>
        <label className="mb-2">
          <span className="ml-8 mr-2">출판사</span>
          <input type="text" className="rounded p-1 border" />
        </label>
      </div>
      <EditorComponent
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="480px"
        initialEditType="markdown"
        language="ko-KR"
        toolbarItems={[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'], ['link']]}
        useCommandShortcut={true}
        usageStatistics={false}
      />
      <div className="flex justify-center items-center mt-4">
        <button className="bg-violet-50 px-8 py-2 text-sm rounded hover:bg-violet-100">작성하기</button>
      </div>
    </div>
  );
};

export default Editor;
