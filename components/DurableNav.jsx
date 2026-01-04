import React from 'react';
import { Link } from 'react-router-dom';

const DurableNav = () => {
  return (
    <nav className="durable-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Elevate for Humanity
        </Link>
        <div className="nav-links">
          <Link to="/durable-ai">Durable AI</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default DurableNav;
