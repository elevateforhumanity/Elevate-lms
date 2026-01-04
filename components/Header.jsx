import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="header-logo">
          <h1>Elevate for Humanity</h1>
        </Link>
        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/programs/barber-apprenticeship">Programs</Link>
          <Link href="/funding">Funding</Link>
          <Link href="/team">Team</Link>
          <Link href="/advising">Advising</Link>
          <Link href="/support">Support</Link>
          <Link href="/apply">Apply</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
