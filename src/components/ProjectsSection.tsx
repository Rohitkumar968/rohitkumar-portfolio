import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import {
  ExternalLink,
  Github,
  Plane,
  Cloud,
  CircleDollarSign,
  Calculator,
  Star,
  GitFork,
  Clock,
  Code2,
  Loader2,
  Code,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.08,
    },
  }),
};

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  highlights: string[];
  icon: React.ElementType;
  color: string;
  githubUrl: string;
  demoUrl: string | null;
  githubOwner?: string;
  githubRepo?: string;
  index: number;
}

function GitHubStats({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const { data, loading, error } = useGitHubRepo(owner, repo);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Loading stats...</span>
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const updatedDate = new Date(
    data.updated_at
  ).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3 mt-3">
      {data.language && (
        <span className="flex items-center gap-1">
          <Code2 className="w-3 h-3 text-primary" />
          {data.language}
        </span>
      )}

      <span className="flex items-center gap-1">
        <Star className="w-3 h-3 text-yellow-500" />
        {data.stargazers_count}
      </span>

      <span className="flex items-center gap-1">
        <GitFork className="w-3 h-3 text-accent" />
        {data.forks_count}
      </span>

      <span className="flex items-center gap-1 ml-auto">
        <Clock className="w-3 h-3" />
        Updated {updatedDate}
      </span>
    </div>
  );
}

function ProjectCard({
  title,
  subtitle,
  description,
  tech,
  highlights,
  icon: Icon,
  color,
  githubUrl,
  demoUrl,
  githubOwner,
  githubRepo,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -6,
        transition: {
          duration: 0.25,
        },
      }}
      className="glass-card group overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
        {description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((technology) => (
          <span
            key={technology}
            className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground border border-border/50"
          >
            {technology}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid gap-1.5 mb-4">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/60 border border-border/50 rounded-lg px-3 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            {highlight}
          </div>
        ))}
      </div>

      {/* GitHub Stats */}
      {githubOwner && githubRepo && (
        <GitHubStats
          owner={githubOwner}
          repo={githubRepo}
        />
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4 border-t border-border mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 hover:bg-primary/10 hover:text-primary transition-colors"
          asChild
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </Button>

        {demoUrl ? (
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 hover:bg-accent/10 hover:text-accent transition-colors"
            asChild
          >
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 opacity-50 cursor-not-allowed"
            disabled
          >
            <Clock className="w-4 h-4" />
            Coming Soon
          </Button>
        )}
      </div>
    </motion.div>
  );
}

const projects: Omit<ProjectCardProps, 'index'>[] = [
  {
    title: 'TravelNest AI',
    subtitle: 'Featured · MERN Stack + AI',

    description:
      'AI-powered travel planning platform with personalized itinerary generation using Groq AI (Llama 3). Features JWT + bcrypt authentication, responsive glassmorphism UI, and a full MERN Stack architecture deployed on Vercel, Render, and MongoDB Atlas.',

    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Bcrypt',
      'Zustand',
      'Axios',
      'Groq AI',
    ],

    icon: Plane,
    color: 'from-blue-500 to-cyan-500',

    highlights: [
      'AI Itinerary Generation via Groq AI (Llama 3)',
      'JWT + Bcrypt Authentication & Protected Routes',
      'Deployed on Vercel · Render · MongoDB Atlas',
    ],

    githubUrl:
      'https://github.com/Rohitkumar968/TravelNest-AI',

    demoUrl:
      'https://travel-nest-ai-five.vercel.app/',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'TravelNest-AI',
  },

  {
    title: 'AI Finance Manager',
    subtitle: 'Featured · MERN Stack + AI',

    description:
      'AI-powered personal finance management platform built with the MERN stack. Manage transactions, budgets, savings goals, and financial insights with an intelligent AI financial assistant and a secure role-based admin panel.',

    tech: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'AI',
      'Recharts',
    ],

    icon: CircleDollarSign,
    color: 'from-violet-500 to-purple-500',

    highlights: [
      'AI Financial Advisor, Spending Analysis & Smart Recommendations',
      'Transactions, Budgets, Savings Goals & Analytics',
      'Admin Panel with RBAC, User Management & AI Analytics',
      'Deployed on Vercel · Render · MongoDB Atlas',
    ],

    githubUrl:
      'https://github.com/Rohitkumar968/ai-finance-manager.git',

    demoUrl:
      'https://rohit-ai-finance-manager.vercel.app',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'ai-finance-manager',
  },

  {
    title: 'CareerBridge Job Portal',
    subtitle: 'Featured · MERN Stack',

    description:
      'Full-stack job portal connecting job seekers and recruiters through a modern and responsive platform. Includes secure authentication, job discovery, saved jobs, job applications, recruiter workflows, dashboards, and role-based access control.',

    tech: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'REST APIs',
      'Axios',
    ],

    icon: Briefcase,
    color: 'from-orange-500 to-red-500',

    highlights: [
      'Job Search, Filtering, Saved Jobs & Applications',
      'JWT Authentication with Role-Based Access Control',
      'Recruiter & Job Seeker Dashboards',
      'RESTful APIs with Node.js, Express.js & MongoDB',
    ],

    githubUrl:
      'https://github.com/Rohitkumar968/careerbridge.git',

    demoUrl:
      'https://careerbridgejob-portal.netlify.app/',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'careerbridge',
  },

  {
    title: 'Weather App',
    subtitle: 'Frontend · React + Weather API',

    description:
      'Real-time weather forecast application with city search, responsive UI, error handling, and loading states. Built with React and the Weather API to provide live weather information.',

    tech: [
      'React',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Axios',
      'Weather API',
    ],

    icon: Cloud,
    color: 'from-emerald-500 to-teal-500',

    highlights: [
      'Real-Time Weather Forecast',
      'City Search with Error Handling',
      'Optimized React Components',
    ],

    githubUrl:
      'https://github.com/Rohitkumar968/My-Weather-App.git',

    demoUrl:
      'https://weather-app-roh.netlify.app/',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'My-Weather-App',
  },
 {
    title: 'Calculator App',
    subtitle: 'Frontend · HTML + CSS + JavaScript',

    description:
    'Responsive calculator application built with HTML, CSS, and JavaScript for performing basic arithmetic operations with a clean and user-friendly interface.',

    tech: [
    'HTML5',
    'CSS3',
    'JavaScript',
    ],

    highlights: [
    'Implemented addition, subtraction, multiplication, and division',
    'Built a clean and responsive calculator interface',
    'Added percentage, decimal, clear, and backspace operations',
    'Responsive design for desktop and mobile devices',
    ],

    icon: Calculator,

    color: 'from-cyan-500 to-blue-500',

    githubUrl:
    'https://github.com/Rohitkumar968/my-calculator.git',

    demoUrl:
    'https://rohit-calculato.netlify.app/',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'my-calculator',
    },
  {
    title: 'Personal Portfolio',
    subtitle: 'Featured · React + TypeScript',

    description:
      'Modern and responsive personal portfolio website showcasing technical skills, projects, career objectives, and professional profile with a clean and interactive user experience.',

    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'JavaScript',
    ],

    icon: Code,
    color: 'from-purple-500 to-pink-500',

    highlights: [
      'Responsive Design for Desktop, Tablet & Mobile',
      'Modern UI with Smooth Animations & Interactions',
      'Dedicated Sections for Projects, Skills, Career Objective & Contact',
    ],

    githubUrl:
      'https://github.com/Rohitkumar968/rohitkumar-portfolio',

    demoUrl:
      'https://rohitkumar0-portfolio.netlify.app/',

    githubOwner: 'Rohitkumar968',
    githubRepo: 'rohitkumar-portfolio',
  },
];

export function ProjectsSection() {
  const { ref } = useScrollAnimation();

  const [currentPage, setCurrentPage] = useState(0);

  const projectsPerPage = 4;

  const totalPages = Math.ceil(
    projects.length / projectsPerPage
  );

  const startIndex =
    currentPage * projectsPerPage;

  const visibleProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative"
    >
      <div className="absolute inset-0 hero-bg opacity-50" />

      <div
        className="container mx-auto px-4 md:px-6 relative z-10"
        ref={ref}
      >
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="section-title"
          >
            Featured{' '}
            <span className="text-gradient">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="section-subtitle"
          >
            Real-world applications built with modern
            web technologies
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -30,
              }}
              transition={{
                duration: 0.35,
                ease: 'easeInOut',
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {visibleProjects.map(
                (project, index) => (
                  <ProjectCard
                    key={project.title}
                    {...project}
                    index={index}
                  />
                )
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              variant="outline"
              size="icon"
              onClick={previousPage}
              disabled={currentPage === 0}
              aria-label="Previous projects"
              className="rounded-full w-11 h-11 transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Page Indicators */}
            <div className="flex items-center gap-2">
              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index)
                  }
                  aria-label={`Go to project page ${
                    index + 1
                  }`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'w-8 bg-primary'
                      : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={
                currentPage === totalPages - 1
              }
              aria-label="Next projects"
              className="rounded-full w-11 h-11 transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Page Counter */}
        {totalPages > 1 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing{' '}
            <span className="text-foreground font-medium">
              {startIndex + 1}
            </span>
            {' – '}
            <span className="text-foreground font-medium">
              {Math.min(
                startIndex + projectsPerPage,
                projects.length
              )}
            </span>
            {' of '}
            <span className="text-foreground font-medium">
              {projects.length}
            </span>{' '}
            projects
          </p>
        )}

        {/* GitHub Button */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.3,
          }}
          className="text-center mt-12"
        >
          <Button
            variant="heroOutline"
            size="lg"
            asChild
          >
            <a
              href="https://github.com/Rohitkumar968"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}