'use client';

import { useState, useEffect } from 'react';

const ArrowRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const stats = [
  { number: '20+', label: 'Projects Completed' },
  { number: '15+', label: 'Happy Clients' },
  { number: '4+',  label: 'Years Experience' },
];

const texts = [
  'AI Solutions',
  'Web Applications',
  'Mobile Apps',
  'Data Analytics',
];

export const HeroSectionSimple = () => {
  const [typedText, setTypedText]     = useState(texts[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const [isClient, setIsClient]       = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (!isClient) return;

    const typeSpeed  = isDeleting ? 50 : 100;
    const currentText = texts[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2200);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        const next = isDeleting
          ? currentText.substring(0, typedText.length - 1)
          : currentText.substring(0, typedText.length + 1);
        setTypedText(next);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, currentIndex, isDeleting, isClient]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">

          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            AI-Powered Technology Company
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Building Tomorrow&apos;s{' '}
            <span className="hero-animated-text">
              {typedText}
            </span>
            {isClient && <span className="hero-cursor" aria-hidden="true"></span>}
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            GyrixAI delivers custom software, intelligent AI applications, and
            digital experiences that drive measurable results for forward-thinking businesses.
          </p>

          {/* CTAs */}
          <div className="hero-buttons">
            <button onClick={() => scrollTo('contact')} className="hero-button-primary" id="hero-cta-primary">
              Start Your Project
              <ArrowRight />
            </button>
            <button onClick={() => scrollTo('portfolio')} className="hero-button-secondary" id="hero-cta-secondary">
              <PlayIcon />
              Explore Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};