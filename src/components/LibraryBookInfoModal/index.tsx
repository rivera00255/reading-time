'use client';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import LibraryBookInfo from '../LibraryBookInfo';

const LibraryBookInfoModal = ({
  param,
  popup,
  setPopup,
}: {
  param: string;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (searchRef.current) {
      if (searchRef.current.value !== '' && searchRef.current.value !== param) {
        setSearch(searchRef.current.value.replaceAll(' ', '_'));
      }
    }
  };

  const onCheckEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') handleSearch();
  };

  const handleParam = () => {
    if (param !== search && search !== '') return search;
    return param;
  };

  return (
    <div className="bg-zinc-900/20 flex justify-center items-center fixed top-0 left-0 w-full h-screen z-10">
      <div className="container xl mx-auto bg-white rounded p-4 relative max-h-80 overflow-y-scroll">
        <button className="absolute top-2 right-5" onClick={() => setPopup(false)}>
          ✕
        </button>
        <label className="flex justify-center items-center">
          <input
            type="text"
            placeholder="책 제목을 입력하세요."
            defaultValue={param}
            ref={searchRef}
            onKeyUp={(e: any) => onCheckEnter(e)}
            className="border p-2 rounded text-sm"
          />
          <button
            className="bg-slate-300 px-4 py-2 rounded text-white ml-1 text-sm hover:bg-slate-200"
            onClick={handleSearch}>
            검색
          </button>
        </label>
        <LibraryBookInfo param={handleParam()} popup={popup} setPopup={setPopup} />
      </div>
    </div>
  );
};

export default LibraryBookInfoModal;
