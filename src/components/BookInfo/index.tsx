import { Book } from '@/type/search';
import Image from 'next/image';

const BookInfo = ({ item }: { item: Book }) => {
  //   console.log(item);
  return (
    <div className="bg-violet-50 mb-1 px-8 py-4 rounded flex">
      <div>
        <Image src={item.thumbnail} alt={item.title} width={100} height={100} />
      </div>
      <div>{item.title}</div>
    </div>
  );
};

export default BookInfo;
