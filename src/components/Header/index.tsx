import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="container 2xl mx-auto py-4">
        <h1 className="text-center">
          <Link href="/">Reading Time</Link>
        </h1>
      </nav>
    </header>
  );
};

export default Header;
