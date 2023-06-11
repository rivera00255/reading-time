'use client';
import { RootState } from '@/store';
import { reset, set } from '@/store/slices/searchSlice';
import { BookRent } from '@/type/library';
import { fetcher } from '@/utilities/fetcher';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const libraryApiKey = process.env.NEXT_PUBLIC_LIBRARY_API_KEY;
const libraryUrl = process.env.NEXT_PUBLIC_LIBRARY_URL;

const LibraryBookInfo = ({
  param,
  popup,
  setPopup,
}: {
  param: string;
  popup: boolean;
  setPopup: Dispatch<SetStateAction<boolean>>;
}) => {
  const [offset, setOffset] = useState(5);
  const [lastPage, setLastPage] = useState(0);
  const [searchResult, setSearchResult] = useState({ CODE: '', MESSAGE: '' });
  const [bookInfo, setBookInfo] = useState<BookRent[]>([]);

  const dispatch = useDispatch();
  const searchBookResult = useSelector((state: RootState) => state.search);
  // console.log(lastPage);
  // console.log(searchResult);
  // console.log(offset);
  // console.log(searchBookResult.pageResult);

  const { data, isLoading } = useQuery(
    ['library', param, offset],
    async () => {
      const response = await fetcher(
        'GET',
        `${libraryUrl}${libraryApiKey}/json/SeoulLibraryBookSearchInfo/1/${offset}/${param.replaceAll(' ', '_')}`
      );
      // console.log(offset);
      // response.SeoulLibraryBookSearchInfo
      //   ? setSearchResult(response.SeoulLibraryBookSearchInfo.RESULT)
      //   : setSearchResult(response.RESULT);
      if (response.SeoulLibraryBookSearchInfo) {
        setSearchResult(response.SeoulLibraryBookSearchInfo.RESULT);
        setBookInfo(response.SeoulLibraryBookSearchInfo.row);
        setLastPage(response.SeoulLibraryBookSearchInfo.list_total_count);
        !popup
          ? dispatch(set({ pageResult: response.SeoulLibraryBookSearchInfo.list_total_count }))
          : dispatch(reset());
      } else {
        setSearchResult(response.RESULT);
      }
      return response;
    },
    { enabled: param !== '' ? true : false }
  );
  // console.log(data);

  useEffect(() => {
    if (popup) {
      searchBookResult.pageResult !== 0 && setOffset(searchBookResult.pageResult);
      lastPage !== 0 && setOffset(lastPage);
    } else {
      setOffset(5);
      setLastPage(0);
    }
  }, [lastPage, popup, searchBookResult.pageResult]);

  return (
    <section className="container xl mx-auto px-4 my-8">
      <h3>자료 현황</h3>
      <h4 className="mb-8 text-xs">서울 도서관 소장자료 현황</h4>
      <table className="border-collapse border border-slate-300 w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border border-slate-200">
            <td className="py-2 text-center">분류기호</td>
            <td className="py-2 text-center">자료명</td>
            <td className="py-2 text-center">저자</td>
            <td className="py-2 text-center">출판사</td>
            <td className="py-2 text-center">발행년도</td>
            <td className="py-2 text-center">대출상태</td>
            <td className="py-2 text-center">위치</td>
          </tr>
        </thead>
        <tbody>
          {searchResult.CODE === 'INFO-000' ? (
            bookInfo.map((item: BookRent) => (
              <tr key={item.CTRLNO} className="border border-slate-100">
                <td className="text-xs px-2 text-center">{item.CTRLNO}</td>
                <td className="p-2">{item.TITLE}</td>
                <td className="p-2">{item.AUTHOR.replace(' 지음', '').replace(' [지음]', '').replace(' [저]', '')}</td>
                <td className="p-2">{item.PUBLER}</td>
                <td className="p-2">{item.PUBLER_YEAR}</td>
                <td className="p-2">{item.LOAN_STATUS_NAME}</td>
                <td className="p-2">{item.SUB_LOCA_NAME}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-xs p-2 text-center">
                검색 결과가 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!popup && (
        <div className="flex justify-center items-center my-4">
          <button
            className="text-sm px-2 py-1 rounded drop-shadow-sm border hover:bg-amber-100"
            onClick={() => setPopup(true)}>
            {searchResult.CODE === 'INFO-000' ? '더보기' : '도서명으로 검색하기'}
          </button>
        </div>
      )}
    </section>
  );
};

export default LibraryBookInfo;
