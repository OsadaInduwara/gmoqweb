'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Menu Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference if no saved theme
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

    // Set initial scroll state
    setIsScrolled(window.scrollY > 20);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    closeMenu();
  };

  // Prevent hydration mismatch by not applying scroll state until mounted
  const navClassName = mounted 
    ? `navigation ${isScrolled ? 'scrolled' : ''}`
    : 'navigation';

  return (
    <nav className={navClassName}>
      <div className="navigation-container">
        
        {/* Logo */}
        <Link href="/" className="navigation-logo">
          <div className="navigation-logo-icon">G</div>
          <span className="navigation-logo-text">GmoqAI Technologies</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navigation-menu">
          <ul className="navigation-links">
            <li>
              <button 
                onClick={() => scrollToSection('home')} 
                className="navigation-link"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('services')} 
                className="navigation-link"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('portfolio')} 
                className="navigation-link"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about')} 
                className="navigation-link"
              >
                About
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="navigation-link"
              >
                Testimonials
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="navigation-link"
              >
                Contact
              </button>
            </li>
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

        {/* Mobile Menu Toggle */}
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
          <li>
            <button 
              onClick={() => scrollToSection('home')} 
              className="navigation-mobile-link"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')} 
              className="navigation-mobile-link"
            >
              Services
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="navigation-mobile-link"
            >
              Portfolio
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('about')} 
              className="navigation-mobile-link"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="navigation-mobile-link"
            >
              Testimonials
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="navigation-mobile-link"
            >
              Contact
            </button>
          </li>
        </ul>
        
        <div className="navigation-mobile-cta">
          <button 
            onClick={() => scrollToSection('contact')} 
            className="navigation-cta"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};