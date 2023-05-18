import { LibraryRes } from '@/type/library';
import { fetcher } from '@/utilities/fetcher';
import Link from 'next/link';

export const libraryApiKey = process.env.NEXT_PUBLIC_LIBRARY_API_KEY;
export const libraryUrl = process.env.NEXT_PUBLIC_LIBRARY_URL;

export default async function Home() {
  const data: LibraryRes = await fetcher(
    'GET',
    `${libraryUrl}${libraryApiKey}/json/SeoulLibraryBookRentNumInfo/1/20`,
    undefined,
    'no-store'
  );
  const bookRentBest = data.SeoulLibraryBookRentNumInfo?.row;

  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12">
        <Link href="./search">
          <div className="bg-violet-300 text-white flex justify-center items-center py-4 rounded drop-shadow-sm hover:bg-violet-200">
            <p className="drop-shadow">어떤 책을 읽고 싶나요?</p>
          </div>
        </Link>
      </section>
      <section className="container xl mx-auto px-4">
        <h3 className="text-xl">인기 대출도서</h3>
        <h4 className="mb-8 text-xs">서울 도서관 인기대출 도서 목록</h4>
        {bookRentBest?.map((item) => (
          <div key={item.ISBN} className="bg-amber-50 mb-2 rounded px-8 py-4 drop-shadow-sm">
            <p>
              <strong>{item.TITLE}</strong>
            </p>
            <p className="text-sm text-right">{item.AUTHOR.replace(' 지음', '').replace(' [지음]', '')}</p>
            <p className="text-sm text-right">
              {item.PUBLISHER}({item.PUBLISHER_YEAR})
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
