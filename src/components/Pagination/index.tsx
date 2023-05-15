import { Dispatch, SetStateAction, useState } from 'react';

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
}: {
  totalPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  //   console.log(totalPage);
  const pageLimit = 5;
  const [currentPageBlock, setCurrentPageBlock] = useState(0);
  const pageOffset = currentPageBlock * pageLimit;
  //   console.log(currentPageBlock);

  const handlePageBlock = (totalPage: number) => {
    const pageArr: number[] = [];
    for (let i = 0; i < totalPage; i++) pageArr.push(i + 1);
    return pageArr;
  };

  let perPage = handlePageBlock(totalPage).slice(pageOffset, pageLimit + pageOffset);

  const prev = () => {
    if (currentPage <= 1) return;
    if (currentPage - 1 <= pageLimit * currentPageBlock) setCurrentPageBlock((prev) => prev - 1);
    setCurrentPage((page) => page - 1);
  };

  const next = () => {
    if (currentPage >= totalPage) return;
    if (pageLimit * (currentPageBlock + 1) < currentPage + 1) setCurrentPageBlock((prev) => prev + 1);
    setCurrentPage((page) => page + 1);
  };

  if (totalPage <= 1) return <></>;
  return (
    <div>
      <button
        className="border m-1 rounded px-2 disabled:opacity-0"
        onClick={() => {
          setCurrentPage(1);
          setCurrentPageBlock(0);
        }}
        disabled={currentPage === 1 || currentPageBlock === 0}>
        &lt;&lt;
      </button>
      <button
        className="border m-1 rounded px-2 disabled:opacity-0"
        onClick={() => prev()}
        disabled={currentPage === 1}>
        &lt;
      </button>
      {perPage.map((i) => (
        <button
          className={`border m-1 rounded px-2 data-[index]:bg-amber-100`}
          key={i}
          onClick={() => {
            setCurrentPage(i);
            // console.log(i);
          }}
          data-index={currentPage === i ? i : null}>
          {i}
        </button>
      ))}
      {/* {Array(totalPage)
        .fill(null)
        .map((_, i) => (
          <button
            className={`border m-1 rounded px-2 data-[index]:bg-amber-100`}
            key={i + 1}
            onClick={() => {
              setCurrentPage(i + 1);
              console.log(i + 1);
            }}
            data-index={currentPage === i + 1 ? i : null}>
            {i + 1}
          </button>
        ))} */}
      <button
        className="border m-1 rounded px-2 disabled:opacity-0"
        onClick={() => next()}
        disabled={currentPage === totalPage || totalPage === 1}>
        &gt;
      </button>
      <button
        className="border m-1 rounded px-2 disabled:opacity-0"
        onClick={() => {
          setCurrentPage(totalPage);
          setCurrentPageBlock(Math.ceil(totalPage / pageLimit) - 1);
        }}
        disabled={currentPage === totalPage || Math.ceil(totalPage / pageLimit) <= 1}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
