/**
 * Portfolio Home Page
 * 
 * Main landing page that integrates all portfolio sections:
 * - Hero: Introduction and contact information
 * - Skills: Technical skills with animated progress bars
 * - Projects: Showcase of key projects with flip card animations
 * - Experience: Professional work experience timeline
 * - Education: Academic background timeline
 * - Achievements: Recognition and milestones
 * - Certifications: Professional credentials
 * 
 * Features:
 * - Smooth scroll behavior between sections
 * - Section transition animations triggered on scroll
 * - Responsive layout across all breakpoints
 * - Optimized for performance with proper component structure
 */

import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Blog from './components/Blog';
import { 
  profileData, 
  skillsData, 
  projectsData, 
  achievementsData, 
  certificationsData 
} from './lib/portfolioData';

export default function Home() {
  // Portfolio data imported from centralized data file

  return (
    <main id="main-content" className="portfolio-main" role="main">
      {/* Hero Section - Full viewport introduction */}
      <Hero 
        name={profileData.name}
        title={profileData.title}
        description={profileData.description}
        contactInfo={profileData.contactInfo}
      />

      {/* Skills Section - Interactive animated skill bars */}
      <Skills skills={skillsData} />

      {/* Projects Section - Showcase with flip card animations */}
      <Projects projects={projectsData} />

      {/* Experience Section - Professional timeline */}
      <Experience />

      {/* Education Section - Academic timeline */}
      <Education />

      {/* Achievements Section - Recognition and milestones */}
      <Achievements achievements={achievementsData} />

      {/* Certifications Section - Professional credentials */}
      <Certifications certifications={certificationsData} />

      {/* Blog Section - Articles and posts */}
      <Blog />
    </main>
  );
}
