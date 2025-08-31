'use client';

import { useState } from 'react';

// Clean icons for services
const Code = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Brain = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Globe = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const Smartphone = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
  </svg>
);

const BarChart3 = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const Cloud = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const servicesData = [
  {
    id: 'custom-software',
    icon: Code,
    title: 'Custom Software Development',
    description: 'Tailored software solutions built from the ground up to meet your specific business requirements',
    features: [
      'Enterprise Applications',
      'SaaS Platforms', 
      'API Development',
      'Cloud Solutions'
    ],
    technologies: ['React', 'Node.js', 'Python', 'AWS'],
    color: 'blue'
  },
  {
    id: 'ai-ml-solutions',
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Cutting-edge AI solutions that transform data into actionable insights and automated processes',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Recommendation Systems'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Python', 'OpenAI'],
    color: 'purple'
  },
  {
    id: 'web-development',
    icon: Globe,
    title: 'Web Application Development',
    description: 'Modern, responsive web applications that deliver exceptional user experiences across all devices',
    features: [
      'Progressive Web Apps',
      'E-commerce Platforms',
      'Content Management Systems',
      'Real-time Applications'
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
    color: 'green'
  },
  {
    id: 'mobile-development',
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that engage users and drive business growth',
    features: [
      'iOS & Android Apps',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Push Notifications'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    color: 'pink'
  },
  {
    id: 'data-analytics',
    icon: BarChart3,
    title: 'Data Analytics & Visualization',
    description: 'Transform raw data into meaningful insights with advanced analytics and beautiful visualizations',
    features: [
      'Business Intelligence Dashboards',
      'Real-time Data Processing',
      'Custom Reporting',
      'Data Integration'
    ],
    technologies: ['Python', 'R', 'Tableau', 'Power BI'],
    color: 'orange'
  },
  {
    id: 'cloud-devops',
    icon: Cloud,
    title: 'Cloud & DevOps Services',
    description: 'Scalable cloud infrastructure and streamlined deployment processes for optimal performance',
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'CI/CD Pipelines',
      'Container Orchestration'
    ],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes'],
    color: 'cyan'
  }
];

type ColorKey = 'blue' | 'purple' | 'green' | 'pink' | 'orange' | 'cyan';

const colorClasses: Record<ColorKey, { icon: string; bg: string; border: string }> = {
  blue: {
    icon: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800'
  },
  purple: {
    icon: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800'
  },
  green: {
    icon: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800'
  },
  pink: {
    icon: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-200 dark:border-pink-800'
  },
  orange: {
    icon: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800'
  },
  cyan: {
    icon: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800'
  }
};

export const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section id="services" className="services">
      <div className="services-container">
        
        {/* Header */}
        <div className="services-header">
          <div className="section-divider-floating">
            <span className="section-divider-text">Our Services</span>
          </div>
          
          <h2 className="text-primary mb-large">
            Comprehensive Technology Solutions
          </h2>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            From AI-powered applications to cloud infrastructure, we deliver cutting-edge solutions 
            that transform your business and drive measurable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid mb-section">
          {servicesData.map((service) => {
            const Icon = service.icon;
            const colors = colorClasses[service.color as ColorKey];
            
            return (
              <div
                key={service.id}
                className="card group cursor-pointer"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-medium group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <div className={colors.icon}>
                    <Icon />
                  </div>
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {service.title}
                  </h3>
                  
                  <p className="text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-muted">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.icon.replace('text-', 'bg-')} mr-3`} />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="badge text-muted">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-medium">
              Ready to Transform Your Business?
            </h3>
            <p className="text-secondary mb-large leading-relaxed">
              Let&apos;s discuss how our expertise can help you achieve your technology goals. 
              Get a free consultation and project estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-primary btn-lg"
              >
                Get Free Consultation
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('portfolio');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-accent btn-lg"
              >
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};