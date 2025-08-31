import { Service } from '@/types';

export const servicesData: Service[] = [
  {
    id: 'custom-software',
    icon: 'Code',
    title: 'Custom Software Development',
    description: 'Tailored software solutions built from the ground up to meet your specific business requirements',
    features: [
      'Enterprise Applications',
      'SaaS Platforms',
      'API Development',
      'Cloud Solutions',
      'Legacy System Modernization'
    ],
    benefits: [
      'Scalable Architecture',
      '24/7 Support & Maintenance',
      'Agile Development Process',
      'Quality Assurance Testing'
    ],
    technologies: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'],
    gradient: 'from-blue-500 to-purple-600',
    animation: 'float'
  },
  {
    id: 'ai-ml-solutions',
    icon: 'Brain',
    title: 'AI & Machine Learning',
    description: 'Cutting-edge AI solutions that transform data into actionable insights and automated processes',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Recommendation Systems',
      'Fraud Detection'
    ],
    benefits: [
      'Improved Decision Making',
      'Process Automation',
      'Cost Reduction',
      'Enhanced User Experience'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'Python', 'Scikit-learn', 'OpenAI', 'Hugging Face'],
    gradient: 'from-pink-500 to-yellow-500',
    animation: 'pulse'
  },
  {
    id: 'web-development',
    icon: 'Globe',
    title: 'Web Application Development',
    description: 'Modern, responsive web applications that deliver exceptional user experiences across all devices',
    features: [
      'Progressive Web Apps',
      'E-commerce Platforms',
      'Content Management Systems',
      'Real-time Applications',
      'Mobile-First Design'
    ],
    benefits: [
      'Fast Loading Times',
      'SEO Optimized',
      'Cross-browser Compatible',
      'Responsive Design'
    ],
    technologies: ['Next.js', 'React', 'Vue.js', 'Tailwind CSS', 'TypeScript', 'GraphQL'],
    gradient: 'from-green-500 to-blue-600',
    animation: 'float'
  },
  {
    id: 'mobile-development',
    icon: 'Smartphone',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that engage users and drive business growth',
    features: [
      'iOS & Android Apps',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality'
    ],
    benefits: [
      'Faster Time to Market',
      'Cost-Effective Development',
      'Native Performance',
      'App Store Ready'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    gradient: 'from-purple-500 to-pink-600',
    animation: 'pulse'
  },
  {
    id: 'data-analytics',
    icon: 'BarChart3',
    title: 'Data Analytics & Visualization',
    description: 'Transform raw data into meaningful insights with advanced analytics and beautiful visualizations',
    features: [
      'Business Intelligence Dashboards',
      'Real-time Data Processing',
      'Custom Reporting',
      'Data Integration',
      'Performance Metrics'
    ],
    benefits: [
      'Data-Driven Decisions',
      'Real-time Insights',
      'Improved ROI',
      'Operational Efficiency'
    ],
    technologies: ['Python', 'R', 'Tableau', 'Power BI', 'Apache Spark', 'Elasticsearch'],
    gradient: 'from-orange-500 to-red-600',
    animation: 'float'
  },
  {
    id: 'cloud-devops',
    icon: 'Cloud',
    title: 'Cloud & DevOps Services',
    description: 'Scalable cloud infrastructure and streamlined deployment processes for optimal performance',
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'CI/CD Pipelines',
      'Container Orchestration',
      'Monitoring & Alerting'
    ],
    benefits: [
      'Reduced Operational Costs',
      'Improved Scalability',
      'Enhanced Security',
      'Faster Deployments'
    ],
    technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
    gradient: 'from-cyan-500 to-blue-600',
    animation: 'pulse'
  }
];