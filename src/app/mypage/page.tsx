import Link from 'next/link';

const MyPage = () => {
  return (
    <main>
      <section className="container xl mx-auto px-4 mt-8 mb-12">
        <Link href="../bookreport">
          <button>독후감 작성하기</button>
        </Link>
        <div>나의 독후감들</div>
      </section>
    </main>
  );
};

export default MyPage;
