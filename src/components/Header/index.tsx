'use client';
import Image from 'next/image';
import Link from 'next/link';
import WaveBackground from '/public/images/wave_background.svg';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className="relative">
      <Image src={WaveBackground} alt="bg" sizes={'100vw'} className="absolute top-0 -z-10" />
      <nav className="container 2xl mx-auto py-8 relative">
        <h1 className="text-center font-mono font-bold text-lg">
          <Link href="/">Reading Time</Link>
        </h1>
        <Navigation />
      </nav>
    </header>
  );
};

export default Header;
