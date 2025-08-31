'use client';

import { useState, useEffect } from 'react';

// Simple icons - removing unused icons
const Quote = () => (
  <svg className="w-8 h-8 text-primary-pink-500/20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
  </svg>
);

const testimonialsData = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'CTO',
    company: 'TechCorp Solutions',
    content: 'GmoqAI delivered an exceptional AI-powered fraud detection system that exceeded our expectations. Their technical expertise and attention to detail are outstanding. The system has reduced false positives by 75% and saved us millions.',
    rating: 5,
    image: '/testimonials/alex-chen.jpg',
    projectType: 'AI Solutions'
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'The team at GmoqAI transformed our idea into a beautiful, functional web application. Their development process was transparent and collaborative throughout. They delivered on time and within budget.',
    rating: 5,
    image: '/testimonials/maria-rodriguez.jpg',
    projectType: 'Web Development'
  },
  {
    id: 3,
    name: 'David Thompson',
    role: 'Founder',
    company: 'InnovateNow',
    content: 'Working with GmoqAI was a game-changer for our business. They built a scalable mobile app that our users love, and the results speak for themselves. 4.8-star rating on app stores!',
    rating: 5,
    image: '/testimonials/david-thompson.jpg',
    projectType: 'Mobile Development'
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Director of Operations',
    company: 'Enterprise Inc.',
    content: 'GmoqAI&apos;s data analytics dashboard gave us insights we never had before. The real-time visualizations help us make better decisions every day. ROI was achieved within the first quarter.',
    rating: 5,
    image: '/testimonials/emily-davis.jpg',
    projectType: 'Data Analytics'
  },
  {
    id: 5,
    name: 'Robert Kim',
    role: 'VP of Technology',
    company: 'FutureTech Labs',
    content: 'The cloud migration and DevOps setup by GmoqAI improved our deployment speed by 300%. Their expertise in modern infrastructure is impressive. Zero downtime during the entire migration process.',
    rating: 5,
    image: '/testimonials/robert-kim.jpg',
    projectType: 'Cloud & DevOps'
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    role: 'CEO',
    company: 'HealthTech Pro',
    content: 'GmoqAI helped us build a HIPAA-compliant healthcare platform that serves thousands of patients daily. Their understanding of compliance requirements and technical execution was flawless.',
    rating: 5,
    image: '/testimonials/sarah-wilson.jpg',
    projectType: 'Healthcare Software'
  }
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? testimonialsData.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === testimonialsData.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        {/* Header */}
        <div className="testimonials-header">
          <div className="section-divider-gradient">
            <span className="section-divider-text">Client Testimonials</span>
          </div>
          
          <h2 className="testimonials-title">
            What Our Clients Say
          </h2>
          
          <p className="testimonials-subtitle">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about 
            working with GmoqAI Technologies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonialsData.slice(0, 3).map((testimonial, index) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-quote">&quot;</div>
              
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="testimonial-star">
                      {i < testimonial.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                
                <p className="testimonial-text">
                  {testimonial.content}
                </p>
              </div>

              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="testimonial-author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                  <p className="testimonial-company">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="testimonials-stats">
          <div className="testimonials-stat">
            <span className="testimonials-stat-number">98%</span>
            <span className="testimonials-stat-label">Client Satisfaction</span>
          </div>
          <div className="testimonials-stat">
            <span className="testimonials-stat-number">50+</span>
            <span className="testimonials-stat-label">Happy Clients</span>
          </div>
          <div className="testimonials-stat">
            <span className="testimonials-stat-number">4.9</span>
            <span className="testimonials-stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
};