import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'fraud-detection',
    title: 'Fraud Detection & Electricity Usage Forecasting',
    description: 'Advanced ML models for fraud detection and time series forecasting with 95% accuracy',
    longDescription: 'Developed sophisticated machine learning models using TensorFlow and Python to detect fraudulent activities and forecast electricity usage patterns. The system processes thousands of transactions daily and provides real-time fraud alerts while maintaining high accuracy rates.',
    category: 'AI Solutions',
    tags: ['Python', 'TensorFlow', 'Time Series', 'ML', 'Real-time Processing'],
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    featured: true,
    technologies: {
      backend: ['Python', 'TensorFlow', 'Scikit-learn', 'FastAPI'],
      database: ['PostgreSQL', 'Redis', 'InfluxDB'],
      tools: ['Docker', 'AWS SageMaker', 'Kubernetes']
    },
    metrics: {
      performance: '95% Accuracy',
      users: '10K+ Daily Predictions',
      uptime: '99.9%'
    },
    status: 'Completed',
    date: '2024-12'
  },
  {
    id: 'ecommerce-platform',
    title: 'Modern E-commerce Platform',
    description: 'Full-stack e-commerce solution with AI-powered recommendations',
    longDescription: 'Built a comprehensive e-commerce platform with modern React frontend, Node.js backend, and AI-driven product recommendations. Features include real-time inventory management, secure payment processing, and personalized shopping experiences.',
    category: 'Web Apps',
    tags: ['React', 'Node.js', 'AI Recommendations', 'Payment Gateway'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    featured: true,
    technologies: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'GraphQL'],
      database: ['MongoDB', 'Redis'],
      tools: ['Stripe', 'AWS', 'Docker']
    },
    metrics: {
      users: '50K+ Monthly Users',
      performance: '2.1s Load Time',
      uptime: '99.95%'
    },
    status: 'Completed',
    date: '2024-11'
  },
  {
    id: 'mobile-fitness-app',
    title: 'AI Fitness Coach Mobile App',
    description: 'Cross-platform fitness app with AI-powered workout recommendations',
    longDescription: 'Developed a comprehensive fitness application using React Native that leverages machine learning to provide personalized workout plans, nutrition guidance, and progress tracking. The app includes social features and gamification elements.',
    category: 'Mobile Apps',
    tags: ['React Native', 'AI Coach', 'Health Tracking', 'Social Features'],
    gradient: 'from-green-500 via-emerald-500 to-cyan-500',
    featured: false,
    technologies: {
      frontend: ['React Native', 'TypeScript', 'Expo'],
      backend: ['Python', 'Django', 'TensorFlow'],
      database: ['PostgreSQL', 'Firebase'],
      tools: ['Firebase Analytics', 'Sentry', 'CodePush']
    },
    metrics: {
      users: '25K+ Downloads',
      performance: '4.8 Star Rating'
    },
    status: 'In Progress',
    date: '2024-10'
  },
  {
    id: 'enterprise-dashboard',
    title: 'Enterprise Analytics Dashboard',
    description: 'Real-time business intelligence dashboard with advanced visualizations',
    longDescription: 'Created a sophisticated analytics dashboard for enterprise clients featuring real-time data visualization, custom reporting, and predictive analytics. The system handles millions of data points and provides actionable business insights.',
    category: 'Custom Software',
    tags: ['Business Intelligence', 'Real-time Analytics', 'Data Visualization'],
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    featured: true,
    technologies: {
      frontend: ['Vue.js', 'D3.js', 'Chart.js', 'TypeScript'],
      backend: ['Python', 'Flask', 'Apache Kafka'],
      database: ['PostgreSQL', 'ClickHouse', 'Elasticsearch'],
      tools: ['Docker', 'Kubernetes', 'Grafana']
    },
    metrics: {
      users: '500+ Enterprise Users',
      performance: 'Sub-second Query Response',
      uptime: '99.99%'
    },
    status: 'Completed',
    date: '2024-09'
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generation Platform',
    description: 'Advanced NLP platform for automated content creation and optimization',
    longDescription: 'Developed an AI-powered content generation platform that uses state-of-the-art natural language processing to create high-quality marketing content, blog posts, and social media content. Features include SEO optimization and multi-language support.',
    category: 'AI Solutions',
    tags: ['NLP', 'Content Generation', 'SEO Optimization', 'Multi-language'],
    gradient: 'from-purple-500 via-indigo-500 to-blue-500',
    featured: false,
    technologies: {
      backend: ['Python', 'Transformers', 'OpenAI API', 'spaCy'],
      frontend: ['React', 'Next.js', 'TypeScript'],
      database: ['PostgreSQL', 'Vector DB'],
      tools: ['AWS Lambda', 'Docker', 'Redis']
    },
    metrics: {
      users: '15K+ Content Pieces Generated',
      performance: '90% User Satisfaction'
    },
    status: 'Maintenance',
    date: '2024-08'
  }
];