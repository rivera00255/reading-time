'use client';
import { useSelectedLayoutSegment } from 'next/navigation';
import Header from '../Header';
import Provider from '@/lib/Provider';
import Footer from '../Footer';

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();

  if (segment === 'login') return <Provider>{children}</Provider>;
  return (
    <>
      <Header />
      <Provider>{children}</Provider>
      <Footer />
    </>
  );
};

export default CommonLayout;
