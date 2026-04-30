'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return <div className="navigation-theme-toggle">⚪</div>;
  }

  return (
    <button onClick={toggleTheme} className="navigation-theme-toggle" aria-label="Toggle theme">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu  = () => setIsMenuOpen(false);

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    closeMenu();
  };

  const navClassName = mounted
    ? `navigation ${isScrolled ? 'scrolled' : ''}`
    : 'navigation';

  const links = [
    { label: 'Home',      id: 'home' },
    { label: 'Services',  id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About',     id: 'about' },
    { label: 'Contact',   id: 'contact' },
  ];

  return (
    <nav className={navClassName}>
      <div className="navigation-container">

        {/* Logo */}
        <Link href="/" className="navigation-logo">
          <Image
            src="/images/logo.jpeg"
            alt="GyrixAI"
            width={44}
            height={44}
            className="navigation-logo-icon"
            style={{ borderRadius: '10px', objectFit: 'contain' }}
          />
          <span className="navigation-logo-text">GyrixAI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navigation-menu">
          <ul className="navigation-links">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="navigation-link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="navigation-actions">
          <ThemeToggle />
          <button
            onClick={() => scrollToSection('contact')}
            className="navigation-cta"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navigation-mobile-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navigation-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="navigation-mobile-links">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="navigation-mobile-link"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="navigation-mobile-cta">
          <button
            onClick={() => scrollToSection('contact')}
            className="navigation-cta"
          >
            Get Started →
          </button>
        </div>
      </div>
    </nav>
  );
};