'use client';

import { useState } from 'react';

// Simple icons
const ExternalLink = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Github = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const portfolioData = [
  {
    id: 1,
    title: 'AI-Powered E-commerce Platform',
    category: 'Web Application',
    description: 'Next.js e-commerce platform with AI product recommendations, real-time inventory, and advanced analytics dashboard.',
    technologies: ['Next.js', 'React', 'AI/ML', 'Node.js', 'MongoDB'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    status: 'Live',
    metrics: {
      users: '10K+',
      uptime: '99.9%',
      performance: '95/100'
    }
  },
  {
    id: 2,
    title: 'Smart Healthcare Dashboard',
    category: 'Healthcare Tech',
    description: 'Real-time patient monitoring system with predictive analytics and automated alerts for medical professionals.',
    technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: true,
    status: 'Live',
    metrics: {
      hospitals: '25+',
      patients: '50K+',
      accuracy: '94%'
    }
  },
  {
    id: 3,
    title: 'Fintech Mobile App',
    category: 'Mobile App',
    description: 'Cross-platform mobile banking app with biometric authentication and real-time transaction processing.',
    technologies: ['React Native', 'Node.js', 'Express', 'Redis', 'Docker'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'Live',
    metrics: {
      downloads: '100K+',
      rating: '4.8/5',
      transactions: '1M+'
    }
  },
  {
    id: 4,
    title: 'IoT Smart City Platform',
    category: 'IoT Solution',
    description: 'Comprehensive IoT platform for smart city infrastructure monitoring and management.',
    technologies: ['Vue.js', 'Python', 'IoT', 'Kubernetes', 'InfluxDB'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'Live',
    metrics: {
      devices: '5000+',
      cities: '3',
      dataPoints: '10M+'
    }
  },
  {
    id: 5,
    title: 'AI Content Generator',
    category: 'AI Tool',
    description: 'Advanced AI content generation platform with natural language processing and multi-format output.',
    technologies: ['Next.js', 'OpenAI', 'Python', 'FastAPI', 'Redis'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'Beta',
    metrics: {
      content: '1M+',
      accuracy: '92%',
      users: '5K+'
    }
  },
  {
    id: 6,
    title: 'Blockchain Supply Chain',
    category: 'Blockchain',
    description: 'Transparent supply chain tracking system built on blockchain technology with smart contracts.',
    technologies: ['React', 'Solidity', 'Web3.js', 'Ethereum', 'IPFS'],
    image: '/api/placeholder/600/400',
    demoUrl: '#',
    githubUrl: '#',
    featured: false,
    status: 'Development',
    metrics: {
      transactions: '50K+',
      partners: '15+',
      transparency: '100%'
    }
  }
];

const categories = ['All', 'Web Application', 'Mobile App', 'AI Tool', 'Healthcare Tech', 'IoT Solution', 'Blockchain'];

type StatusKey = 'Live' | 'Beta' | 'Development';

const statusColors: Record<StatusKey, string> = {
  'Live': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  'Beta': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'Development': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
};

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = portfolioData.filter(project => 
    activeCategory === 'All' || project.category === activeCategory
  );

  const featuredProjects = portfolioData.filter(project => project.featured);

  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        
        {/* Header */}
        <div className="text-center mb-section">
          <div className="section-divider-dots">
            <span className="section-divider-text">Our Work</span>
          </div>
          
          <h2 className="text-primary mb-large">
            Featured Projects & Case Studies
          </h2>
          
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover our most impactful projects that showcase innovation, technical excellence, 
            and measurable business results across various industries.
          </p>
        </div>

        {/* Featured Projects Showcase */}
        <div className="mb-section">
          <h3 className="text-2xl font-bold text-primary mb-large text-center">
            Featured Success Stories
          </h3>
          
          <div className="portfolio-grid">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative card overflow-hidden"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[project.status as StatusKey]}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors text-sm font-medium">
                        <ExternalLink />
                        Live Demo
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium">
                        <Github />
                        Code
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-semibold text-primary mb-small">
                        {project.title}
                      </h4>
                      <span className="badge badge-primary">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="project-metrics-grid">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="project-metric-item">
                        <div className="project-metric-value">
                          {value}
                        </div>
                        <div className="project-metric-label">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-large">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'btn btn-primary'
                  : 'btn btn-secondary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Projects Grid */}
        <div className="portfolio-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group card cursor-pointer transform hover:scale-105 transition-all duration-200"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 rounded-lg mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold">
                    {project.id}
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[project.status as StatusKey]}`}>
                    {project.status}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="p-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                    <ExternalLink />
                  </button>
                  <button className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <Github />
                  </button>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h4>
                </div>
                
                <span className="badge badge-primary">
                  {project.category}
                </span>
                
                <p className="text-sm text-secondary line-clamp-2">
                  {project.description}
                </p>

                {/* Key Metric */}
                <div className="project-card-metric">
                  <span className="project-card-metric-value">
                    {Object.values(project.metrics)[0]}
                  </span>
                  <span className="project-card-metric-label">
                    {Object.keys(project.metrics)[0]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-section">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-medium">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-secondary mb-medium">
              Let&apos;s discuss your project and create a solution that drives results.
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn btn-primary btn-lg"
            >
              Start Your Project Today
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};