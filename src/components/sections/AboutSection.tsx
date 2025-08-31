'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Icons following Material Design principles
const CheckCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUp = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Users = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const Award = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Target = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

// Company metrics with animated counters
const metrics = [
  { id: 1, value: 100, suffix: '+', label: 'Projects Delivered', icon: Target },
  { id: 2, value: 50, suffix: '+', label: 'Happy Clients', icon: Users },
  { id: 3, value: 5, suffix: '+', label: 'Years Experience', icon: TrendingUp },
  { id: 4, value: 15, suffix: '+', label: 'Team Members', icon: Award }
];

// Core values following atomic design principles
const coreValues = [
  {
    title: 'Innovation First',
    description: 'We embrace cutting-edge technologies and methodologies to deliver breakthrough solutions.',
    icon: '🚀'
  },
  {
    title: 'Client-Centric',
    description: 'Every decision we make is guided by our commitment to client success and satisfaction.',
    icon: '🎯'
  },
  {
    title: 'Quality Excellence',
    description: 'We maintain the highest standards in code quality, testing, and project delivery.',
    icon: '💎'
  },
  {
    title: 'Continuous Growth',
    description: 'We invest in our team&apos;s growth and stay ahead of industry trends and best practices.',
    icon: '📈'
  }
];

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));
      
      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
};

// Metric Card Component
const MetricCard = ({ metric }: { metric: typeof metrics[0] }) => {
  const { count, ref } = useAnimatedCounter(metric.value);
  const IconComponent = metric.icon;

  return (
    <div ref={ref} className="about-stat">
      <div className="about-stat-icon">
        <IconComponent className="w-6 h-6" />
      </div>
      <span className="about-stat-number">
        {count}{metric.suffix}
      </span>
      <span className="about-stat-label">{metric.label}</span>
    </div>
  );
};

export const AboutSection = () => {
  const [activeValue, setActiveValue] = useState(0);

  return (
    <section id="about" className="about">
      <div className="about-container">
        
        {/* Section Header with F-Pattern Layout */}
        <div className="about-header">
          <h2 className="about-title">
            About <span style={{ color: '#c40044' }}>GmoqAI</span> Technologies
          </h2>
          <p className="about-subtitle">
            We're a forward-thinking technology company dedicated to transforming businesses 
            through innovative AI solutions and custom software development.
          </p>
        </div>

        {/* Main Content Grid - Following 8pt Grid System */}
        <div className="about-content">
          
          {/* Left Column - Story & Mission */}
          <div className="about-text">
            
            {/* Mission Statement */}
            <div className="about-mission-card">
              <h3 className="about-section-title">Our Mission</h3>
              <p className="about-mission-text">
                To democratize artificial intelligence and make cutting-edge technology 
                accessible to businesses of all sizes, empowering them to innovate, 
                grow, and succeed in the digital age.
              </p>
            </div>

            {/* Company Story */}
            <div className="about-story">
              <h3 className="about-section-title">Our Story</h3>
              <p className="about-description">
                Founded in 2019 by a team of passionate engineers and AI researchers, 
                GmoqAI Technologies emerged from a simple yet powerful vision: to bridge 
                the gap between complex AI technology and practical business solutions.
              </p>
              <p className="about-description">
                What started as a small consulting firm has evolved into a comprehensive 
                technology partner, serving clients from startups to Fortune 500 companies. 
                Our unique approach combines technical excellence with deep business understanding.
              </p>
            </div>

            {/* Call to Action */}
            <div className="about-cta">
              <button className="about-button">
                <span>Learn More About Us</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="about-visual">
            
            {/* Metrics Grid */}
            <div className="about-stats">
              {metrics.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>

            {/* Team Highlight */}
            <div className="about-team-card">
              <h3 className="about-section-title">Meet Our Leadership</h3>
              <div className="about-ceo-card">
                <div className="about-ceo-avatar">
                  <Image 
                    src="/ceo-photo.png" 
                    alt="Osada Induwara" 
                    width={60}
                    height={60}
                  />
                </div>
                <div className="about-ceo-info">
                  <h4>Osada Induwara</h4>
                  <p>CEO & Founder</p>
                  <p className="about-ceo-description">
                    &quot;Our success is measured by the impact we create for our clients. 
                    Every project is an opportunity to push boundaries and deliver excellence.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section - Card-based Design */}
        <div className="about-values">
          <h3 className="about-values-title">Our Core Values</h3>
          <div className="about-values-grid">
            {coreValues.map((value, index) => (
              <div 
                key={index}
                className={`about-value-card ${activeValue === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className="about-value-icon">
                  {value.icon}
                </div>
                <h4 className="about-value-title">{value.title}</h4>
                <p className="about-value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};