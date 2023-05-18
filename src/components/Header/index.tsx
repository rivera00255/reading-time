import Image from 'next/image';
import Link from 'next/link';
import WaveBackground from '/public/images/wave_background.svg';

const Header = () => {
  return (
    <header className="relative">
      <Image src={WaveBackground} alt="bg" sizes={'100vw'} className="absolute top-0 -z-10" />
      <nav className="container 2xl mx-auto py-8 relative">
        <h1 className="text-center font-mono font-bold text-lg">
          <Link href="/">Reading Time</Link>
        </h1>
        <Link href="./login" className="absolute top-4 right-2">
          <button className="text-zinc-500 p-1 text-sm drop-shadow-sm hover:text-zinc-400">로그인</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
