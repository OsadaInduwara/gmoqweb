'use client';

import { useState, useEffect } from 'react';

const ArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Play = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-8a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const stats = [
  { number: '100+', label: 'Projects Completed' },
  { number: '50+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '99.9%', label: 'Uptime Guarantee' }
];

export const HeroSectionSimple = () => {
  const [typedText, setTypedText] = useState('AI Solutions');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const texts = [
    'AI Solutions',
    'Web Applications', 
    'Mobile Apps',
    'Data Analytics',
    'Cloud Services'
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = texts[currentIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        const nextText = isDeleting 
          ? currentText.substring(0, typedText.length - 1)
          : currentText.substring(0, typedText.length + 1);
        setTypedText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [typedText, currentIndex, isDeleting, texts, isClient]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          
          {/* Main Title */}
          <h1 className="hero-title">
            Building Tomorrow&apos;s{' '}
            <span className="hero-animated-text">
              {typedText}
              {isClient && <span className="hero-cursor">|</span>}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Transform your business with cutting-edge technology solutions. 
            We deliver custom software, AI applications, and digital experiences 
            that drive measurable results for forward-thinking companies.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button onClick={scrollToContact} className="hero-button-primary">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button onClick={scrollToPortfolio} className="hero-button-secondary">
              <Play className="w-5 h-5" />
              Explore Our Work
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="hero-stat">
                <span className="hero-stat-number">{stat.number}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};