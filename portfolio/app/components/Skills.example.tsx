/**
 * Skills Component Usage Example
 * 
 * This file demonstrates how to use the Skills component
 * Copy the sample data and import into your page.tsx
 */

import Skills from './Skills';

// Sample skill data based on resume
const sampleSkills = [
  // Frontend Skills
  { name: 'React', level: 90, category: 'frontend' as const },
  { name: 'Next.js', level: 85, category: 'frontend' as const },
  { name: 'TypeScript', level: 88, category: 'frontend' as const },
  { name: 'JavaScript', level: 92, category: 'frontend' as const },
  { name: 'HTML/CSS', level: 95, category: 'frontend' as const },
  { name: 'Tailwind CSS', level: 87, category: 'frontend' as const },
  
  // Backend Skills
  { name: 'Node.js', level: 85, category: 'backend' as const },
  { name: 'Python', level: 80, category: 'backend' as const },
  { name: 'Express.js', level: 82, category: 'backend' as const },
  { name: 'MongoDB', level: 78, category: 'backend' as const },
  { name: 'PostgreSQL', level: 75, category: 'backend' as const },
  { name: 'REST APIs', level: 88, category: 'backend' as const },
  
  // Other Skills
  { name: 'Git & GitHub', level: 90, category: 'other' as const },
  { name: 'Docker', level: 70, category: 'other' as const },
  { name: 'AWS', level: 65, category: 'other' as const },
  { name: 'Agile/Scrum', level: 80, category: 'other' as const },
];

// Example usage in a page component
export default function SkillsExample() {
  return (
    <div>
      <Skills skills={sampleSkills} />
    </div>
  );
}

/**
 * To use in your page.tsx:
 * 
 * import Skills from './components/Skills';
 * 
 * const skills = [
 *   { name: 'React', level: 90, category: 'frontend' },
 *   { name: 'Node.js', level: 85, category: 'backend' },
 *   // ... more skills
 * ];
 * 
 * export default function Home() {
 *   return (
 *     <main>
 *       <Skills skills={skills} />
 *     </main>
 *   );
 * }
 */
