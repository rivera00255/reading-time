'use client';
import BookInfo from '@/components/BookInfo';
import Pagination from '@/components/Pagination';
import { Book, SearchRes } from '@/type/search';
import { fetcherWithAuth } from '@/utilities/fetcher';
import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';

export const searchApiKey = process.env.NEXT_PUBLIC_SEARCH_API_KEY;
export const searchUrl = process.env.NEXT_PUBLIC_SEARCH_URL;

const Search = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const options = [
    { value: '', name: '전체검색' },
    { value: 'title', name: '제목' },
    { value: 'person', name: '인명' },
    { value: 'publisher', name: '출판사' },
  ];

  const [option, setOption] = useState('');
  // const [param, setParam] = useState('');
  const [param, setParam] = useState({
    target: '',
    query: '',
  });

  let limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [books, setBooks] = useState<SearchRes>({
    documents: [],
    meta: {
      is_end: true,
      pageable_count: 0,
      total_count: 0,
    },
  });

  const handlePage = ({
    is_end,
    pageable_count,
    total_count,
  }: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  }) => {
    // console.log('handle page...');
    let page = Math.trunc(pageable_count / limit);
    let decimal = pageable_count % limit;
    decimal > 0 ? setTotalPage(page + 1) : setTotalPage(page);
    // console.log(totalPage);
  };

  const { data } = useQuery(
    ['book', param, currentPage],
    async () => {
      const response = await fetcherWithAuth(
        'GET',
        `${searchUrl}?target=${param.target}&query=${param.query}&page=${currentPage}`,
        {
          Authorization: `KakaoAK ${searchApiKey}`,
        }
      );
      if (response) {
        setBooks(response);
        setTotalPage(Math.ceil(response?.meta.pageable_count / limit));
        // handlePage(response.meta);
        // setParam({ target: '', query: '' });
      }
      return response;
    },
    { enabled: param.query !== '' ? true : false }
  );

  const onSubmit = () => {
    if (searchRef.current && searchRef.current.value !== '') {
      const query = searchRef.current.value;
      setParam({ target: option, query: query });
    }
  };

  const onCheckEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') onSubmit();
  };

  return (
    <main>
      <section className="container xl mx-auto px-4 my-8">
        <div className="py-8 text-center my-4">
          <p className="mb-2">어떤 책을 읽고 싶나요?</p>
          <label className="flex justify-center items-center">
            <select className="border p-2 rounded mr-1" defaultValue={''} onChange={(e) => setOption(e.target.value)}>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="search book..."
              className="border rounded px-3 py-2 w-80.0"
              ref={searchRef}
              onKeyUp={(e: any) => onCheckEnter(e)}
            />
            <button className="bg-amber-300 px-6 py-2 rounded text-white ml-1 hover:bg-amber-200" onClick={onSubmit}>
              검색
            </button>
          </label>
        </div>
      </section>
      <section className="container xl mx-auto px-4 my-8">
        {books.documents.map((item) => (
          <BookInfo key={item.url} item={item} />
        ))}
        <div className="flex justify-center items-center my-4">
          <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </section>
    </main>
  );
};

// const styledButton = 'border m-1 rounded px-2';

export default Search;
