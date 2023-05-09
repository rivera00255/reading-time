'use client';
import { useRef } from 'react';

const BookSearch = () => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="py-8 text-center my-4">
      <p className="mb-2">어떤 책을 읽고 싶나요?</p>
      <label className="flex justify-center items-center">
        <input type="text" placeholder="search book..." className="border rounded px-3 py-2 w-80.0" ref={searchRef} />
        <button
          className="bg-amber-300 px-6 py-2 rounded text-white ml-1 hover:bg-amber-200"
          onClick={() => {
            if (searchRef.current) {
              searchRef.current.value !== '' && console.log(searchRef.current.value);
            }
          }}>
          검색
        </button>
      </label>
    </div>
  );
};

export default BookSearch;
