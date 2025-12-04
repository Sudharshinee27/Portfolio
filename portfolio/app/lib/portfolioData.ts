/**
 * Portfolio Data - Complete dataset for Sudharshinee S K
 */

export const profileData = {
  name: 'Sudharshinee S K',
  title: 'Pre-Final Year CSE Student | Front-End Developer',
  description: 'Enthusiastic and self-driven front-end developer with a solid foundation in web technologies and a deep interest in building interactive web applications. Experienced in designing and developing projects using HTML, CSS, JavaScript, and Node.js. Strong problem-solving, creativity, and teamwork skills, backed by multiple certifications and academic achievements.',
  contactInfo: {
    phone: '6380069428',
    email: 'sudharshineesk27@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sudharshinee-s-k-a9165832a',
    location: 'Salem, TamilNadu'
  }
};

export const skillsData = [
  { name: 'HTML', level: 90, category: 'frontend' as const },
  { name: 'CSS', level: 88, category: 'frontend' as const },
  { name: 'JavaScript', level: 85, category: 'frontend' as const },
  { name: 'Java', level: 80, category: 'backend' as const },
  { name: 'Python', level: 82, category: 'backend' as const },
  { name: 'Node.js', level: 80, category: 'backend' as const },
  { name: 'Teamwork', level: 90, category: 'other' as const },
  { name: 'Creativity', level: 88, category: 'other' as const },
  { name: 'Problem Solving', level: 92, category: 'other' as const },
];

export const projectsData = [
  {
    id: 'project-1',
    title: 'PG Life - Hostel Booking Web Application',
    description: 'Developed a responsive web platform using HTML, CSS, JavaScript, and Node.js that allows users to search, compare, and book hostels online, enhancing accessibility and user experience.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    highlights: [
      'Allows users to search, compare, and book hostels online',
      'Enhancing accessibility and user experience',
      'Responsive design for mobile and desktop',
      'User-friendly interface for easy navigation'
    ]
  },
  {
    id: 'project-2',
    title: 'Mental Health Chatting Application',
    description: 'Built an intelligent chatbot using Python and NLP techniques to provide basic mental health support through a conversational chat interface, ensuring user engagement and emotional assistance.',
    technologies: ['Python', 'NLP'],
    highlights: [
      'Provides basic mental health support',
      'Conversational chat interface',
      'User engagement and emotional assistance',
      'Natural language processing for understanding user queries'
    ]
  },
  {
    id: 'project-3',
    title: 'Assistive Web Application',
    description: 'Developed a web application designed to help individuals overcome disabilities by providing a virtual assistant that supports accessibility and ease of interaction.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    highlights: [
      'Helps individuals overcome disabilities',
      'Virtual assistant for accessibility',
      'Ease of interaction for users with special needs',
      'Supports various accessibility features'
    ]
  }
];

export const experienceData = [
  {
    id: 'exp-1',
    title: 'Web Development Intern',
    organization: 'Internshala',
    period: '06/2025 - 07/2025',
    type: 'experience' as const,
    description: [
      'Completed a 4-week internship focused on front-end and back-end web development',
      'Designed and developed a project titled PG Life, a web platform that allows hostels to search, compare, and book hostels easily',
      'Worked with HTML, CSS, JavaScript, and Node.js to develop responsive and user-friendly web pages',
      'Enhanced understanding of web architecture, database connectivity, and client-server interaction',
      'Improved problem-solving and debugging skills through real-time implementation and testing'
    ],
    achievements: []
  }
];

export const educationData = [
  {
    id: 'edu-1',
    title: 'BE - Computer Science And Engineering',
    organization: 'Sona College of Technology',
    period: '09/2023 - Present',
    type: 'education' as const,
    description: [
      'Currently pursuing Bachelor of Engineering in Computer Science and Engineering',
      'Maintaining strong academic performance with CGPA of 8.85/10',
      'Gaining comprehensive knowledge in software development, algorithms, and web technologies',
      'Actively participating in technical events and competitions'
    ],
    achievements: [
      'Current CGPA: 8.85/10'
    ]
  },
  {
    id: 'edu-2',
    title: 'HSC',
    organization: 'Cluny Matriculation Higher Secondary School',
    period: '01/2022 - 01/2023',
    type: 'education' as const,
    description: [
      'Completed Higher Secondary Certificate with strong academic performance',
      'Focused on core subjects preparing for engineering studies',
      'Developed foundational knowledge in mathematics and science'
    ],
    achievements: [
      'Percentage: 87.8/100'
    ]
  }
];

export const achievementsData = [
  {
    title: 'Academic Excellence Award',
    description: 'Honored with the Academic Excellence Award for two consecutive years in recognition of outstanding academic performance and consistent dedication to learning',
    year: '2023 & 2024',
    icon: '🏆'
  },
  {
    title: 'First Place - College Technical Event',
    description: 'Secured First Place in the "QUIZ TO QUERK" event conducted during the SPARKS 2024 technical symposium at Sona College of Technology, Salem',
    year: '2024',
    icon: '🥇'
  }
];

export const certificationsData = [
  {
    name: 'Infosys Springboard - Basics of Python',
    issuer: 'Infosys Springboard',
    description: 'Gained foundational knowledge in Python programming, including data types, control structures, functions, and basic problem-solving techniques',
    date: '2024',
    verified: true
  },
  {
    name: 'NPTEL - Machine Learning',
    issuer: 'NPTEL',
    description: 'Completed a certified course on Machine Learning concepts such as supervised and unsupervised learning, model evaluation, and data preprocessing',
    date: '2024',
    verified: true
  },
  {
    name: 'Cisco Networking Academy - Packet Tracer Certificate in Computer Networks',
    issuer: 'Cisco Networking Academy',
    description: 'Learned the fundamentals of computer networking, including IP addressing, routing, and network simulation using Cisco Packet Tracer',
    date: '2024',
    verified: true
  },
  {
    name: 'Future Skills - Bootcamp on Software and Network Security',
    issuer: 'Future Skills',
    description: 'Acquired essential knowledge in software protection, network security, threat analysis, and data privacy through hands-on modules and industry-relevant practices',
    date: '2024',
    verified: true
  }
];
