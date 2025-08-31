export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'AI Solutions' | 'Web Apps' | 'Mobile Apps' | 'Custom Software';
  tags: string[];
  image?: string;
  gradient: string;
  link?: string;
  github?: string;
  featured: boolean;
  technologies: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    tools?: string[];
  };
  metrics?: {
    users?: string;
    performance?: string;
    uptime?: string;
  };
  status: 'Completed' | 'In Progress' | 'Maintenance';
  date: string;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  gradient: string;
  animation?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image?: string;
  skills: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}