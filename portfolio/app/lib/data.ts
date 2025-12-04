/**
 * Portfolio Data
 * Centralized data file containing all portfolio information
 * Based on Sudharshinee S K's resume and professional profile
 */

// Type definitions
export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'other';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface TimelineItemData {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: 'experience' | 'education';
  description: string[];
  achievements?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  icon?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
  date: string;
  verified: boolean;
}

// Profile Information
export const profileData = {
  name: 'Sudharshinee S K',
  title: 'Full Stack Developer & Software Engineer',
  description: 'Passionate about creating elegant solutions to complex problems. Specializing in modern web technologies and building scalable applications with a focus on user experience and performance.',
  contactInfo: {
    phone: '+91 9876543210',
    email: 'sudharshinee.sk@example.com',
    linkedin: 'https://linkedin.com/in/sudharshinee-sk',
    location: 'Chennai, India'
  }
};

// Skills Data
export const skillsData: Skill[] = [
  // Frontend Skills
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 88, category: 'frontend' },
  { name: 'JavaScript', level: 92, category: 'frontend' },
  { name: 'HTML/CSS', level: 95, category: 'frontend' },
  { name: 'Tailwind CSS', level: 87, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },
  { name: 'Redux', level: 82, category: 'frontend' },
  
  // Backend Skills
  { name: 'Node.js', level: 88, category: 'backend' },
  { name: 'Express', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'Flask', level: 75, category: 'backend' },
  { name: 'MongoDB', level: 82, category: 'backend' },
  { name: 'PostgreSQL', level: 80, category: 'backend' },
  { name: 'MySQL', level: 78, category: 'backend' },
  { name: 'Prisma', level: 76, category: 'backend' },
  
  // Other Skills
  { name: 'Git', level: 90, category: 'other' },
  { name: 'REST APIs', level: 88, category: 'other' },
  { name: 'GraphQL', level: 75, category: 'other' },
  { name: 'Docker', level: 70, category: 'other' },
  { name: 'AWS', level: 72, category: 'other' },
  { name: 'Testing (Jest/Vitest)', level: 80, category: 'other' },
  { name: 'CI/CD', level: 74, category: 'other' },
  { name: 'Agile/Scrum', level: 85, category: 'other' },
];

// Projects Data
export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management and secure payment processing',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Stripe'],
    highlights: [
      'Implemented secure payment gateway integration with Stripe',
      'Built real-time inventory tracking system with WebSocket',
      'Optimized database queries reducing load time by 40%',
      'Developed responsive UI with mobile-first approach',
      'Integrated email notifications for order updates'
    ]
  },
  {
    id: 'project-2',
    title: 'Task Management System',
    description: 'Collaborative project management tool with real-time updates and team collaboration features',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'WebSocket', 'Tailwind CSS'],
    highlights: [
      'Real-time collaboration using WebSocket technology',
      'Drag-and-drop task organization with smooth animations',
      'Role-based access control system for team management',
      'Automated email notifications and reminders',
      'Advanced filtering and search capabilities'
    ]
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'Interactive weather forecasting application with data visualization and location-based predictions',
    technologies: ['React', 'Chart.js', 'OpenWeather API', 'Tailwind CSS', 'Geolocation API'],
    highlights: [
      'Integrated multiple weather APIs for accurate forecasts',
      'Interactive charts and data visualization with Chart.js',
      'Location-based weather predictions with geolocation',
      'Responsive design with dark mode support',
      '7-day forecast with hourly breakdowns'
    ]
  },
  {
    id: 'project-4',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for tracking social media engagement metrics across multiple platforms',
    technologies: ['Vue.js', 'Python', 'Flask', 'D3.js', 'MySQL', 'Redis'],
    highlights: [
      'Real-time data processing and visualization',
      'Custom analytics algorithms for engagement metrics',
      'Export reports in PDF, CSV, and Excel formats',
      'Integration with major social platforms (Twitter, Instagram, Facebook)',
      'Automated daily reports and insights'
    ]
  },
  {
    id: 'project-5',
    title: 'Blog Platform with CMS',
    description: 'Modern blogging platform with custom CMS, markdown support, and SEO optimization',
    technologies: ['Next.js', 'TypeScript', 'MDX', 'Prisma', 'PostgreSQL', 'Vercel'],
    highlights: [
      'Custom CMS for content management',
      'Markdown and MDX support for rich content',
      'SEO optimization with meta tags and sitemap',
      'Image optimization with Next.js Image component',
      'Comment system with moderation features'
    ]
  },
  {
    id: 'project-6',
    title: 'Fitness Tracking App',
    description: 'Mobile-responsive fitness tracking application with workout plans and progress monitoring',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Chart.js'],
    highlights: [
      'Custom workout plan generator based on user goals',
      'Progress tracking with visual charts and statistics',
      'Social features for sharing achievements',
      'Integration with fitness wearables',
      'Nutrition tracking and meal planning'
    ]
  }
];