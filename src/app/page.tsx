import BookPreview from '@/components/BookPreview';
import BookSearch from '@/components/BookSearch';

export default function Home() {
  return (
    <main>
      <section className="container xl mx-auto">
        <BookSearch />
      </section>
      <section className="container xl mx-auto">
        <h3>국립중앙도서관 사서추천도서</h3>
        <BookPreview />
      </section>
    </main>
  );
}
