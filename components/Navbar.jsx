"use client";

import { useState, useEffect } from "react";
import "../styles/navbar.scss";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-outer">
      <header className={`header ${scrolled ? "header--scrolled" : ""} ${menuOpen ? "header--open" : ""}`}>
        <div className="header-top">
          <div className="header-brand">elai</div>

          <nav className="header-nav">
            <a href="#categories">Categories</a>
            <a href="#why-elai">Why Elai</a>
            <a href="#sellers">Sell on Elai</a>
            <a href="#contact" className="header-nav__cta">Get Early Access</a>
          </nav>

          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Always in DOM — animated via CSS */}
        <nav className="mobile-menu">
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#why-elai" onClick={() => setMenuOpen(false)}>Why Elai</a>
          <a href="#sellers" onClick={() => setMenuOpen(false)}>Sell on Elai</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mobile-menu__cta">Get Early Access →</a>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
