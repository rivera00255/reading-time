import Image from 'next/image';
import Link from 'next/link';
import WaveBackground from '/public/images/wave_background.svg';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute top-0 -z-10">
        <path
          fill="#ede9fe"
          fillOpacity="1"
          d="M0,32L34.3,64C68.6,96,137,160,206,176C274.3,192,343,160,411,133.3C480,107,549,85,617,112C685.7,139,754,213,823,245.3C891.4,277,960,267,1029,245.3C1097.1,224,1166,192,1234,154.7C1302.9,117,1371,75,1406,53.3L1440,32L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path>
      </svg>
      {/* <Image src={WaveBackground} alt="bg" sizes={'100vw'} className="absolute top-0 -z-10" /> */}
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
