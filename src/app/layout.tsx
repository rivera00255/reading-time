import Header from '@/components/Header';
import '../styles/globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Footer from '@/components/Footer';
import Provider from '@/lib/Provider';

const notoSans = Noto_Sans_KR({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: 'Reading Time',
  description: 'What do you want to read?',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <Header />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
