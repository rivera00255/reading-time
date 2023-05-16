import { Book } from '@/type/search';
import Image from 'next/image';

const BookInfo = ({ item }: { item: Book }) => {
  return (
    <div className="bg-violet-50 mb-2 px-8 py-4 rounded flex drop-shadow-sm hover:drop-shadow">
      <div className="pr-4 min-w-fit">
        {item.thumbnail && <Image src={item.thumbnail} alt={item.title} width={100} height={100} />}
        {!item.thumbnail && (
          <div className="w-24 h-full bg-violet-100 flex justify-center items-center">
            <p className="text-xs text-violet-200">No Images</p>
          </div>
        )}
      </div>
      <div className="px-2">
        <p>
          <strong>{item.title}</strong>
        </p>
        <hr className="my-2" />
        <p className="text-sm mt-1">{item.authors.map((name) => `${name} `)}</p>
        <p className="text-sm mt-1">
          {item.publisher} ({new Date(item.datetime).getFullYear()})
        </p>
        <div className="text-xs mt-2 max-w-full max-h-16 text-ellipsis overflow-hidden">{item.contents}</div>
      </div>
    </div>
  );
};

export default BookInfo;
