'use client';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="container xl mx-auto px-4 min-h-50vh flex justify-center items-center">
      <div className="border rounded p-8 text-center">
        <p className="mb-2">This page could not be found.</p>
        <Link href="/">
          <button className="bg-zinc-200 px-2 py-1 rounded text-sm">메인 화면으로 이동</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
