import { ExternalLink, Github, Plane, Cloud, Star, GitFork, Clock, Code2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 },
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

function GitHubStats({ owner, repo }: { owner: string; repo: string }) {
  const { data, loading, error } = useGitHubRepo(owner, repo);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="w-3 h-3 animate-spin" />
        <span>Loading stats…</span>
      </div>
    );
  }

  if (error || !data) return null;

  const updatedDate = new Date(data.updated_at).toLocaleDateString('en-IN', {
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
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="glass-card group overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
        {description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t) => (
          <span key={t} className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground border border-border/50">
            {t}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <div className="grid gap-1.5 mb-4">
        {highlights.map((h) => (
          <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/60 border border-border/50 rounded-lg px-3 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            {h}
          </div>
        ))}
      </div>

      {/* GitHub live stats */}
      {githubOwner && githubRepo && (
        <GitHubStats owner={githubOwner} repo={githubRepo} />
      )}

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-border mt-4">
        <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4" />
            Source Code
          </a>
        </Button>

        {demoUrl ? (
          <Button variant="ghost" size="sm" className="flex-1 hover:bg-accent/10 hover:text-accent transition-colors" asChild>
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
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
      'AI-powered travel planning platform with personalized itinerary generation using Groq AI (Llama 3). Features JWT + bcrypt authentication, responsive glassmorphism UI, and full MERN Stack architecture deployed on Vercel, Render, and MongoDB Atlas.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Bcrypt', 'Zustand', 'Axios', 'Groq AI'],
    icon: Plane,
    color: 'from-blue-500 to-cyan-500',
    highlights: [
      'AI Itinerary Generation via Groq AI (Llama 3)',
      'JWT + Bcrypt Authentication & Protected Routes',
      'Deployed on Vercel · Render · MongoDB Atlas',
    ],
    githubUrl: 'https://github.com/Rohitkumar968/TravelNest-AI',
    demoUrl: null,
    githubOwner: 'Rohitkumar968',
    githubRepo: 'TravelNest-AI',
  },
  {
    title: 'Weather App',
    subtitle: 'Frontend · React + Weather API',
    description:
      'Real-time weather forecast application with city search, responsive UI, error handling, and loading states. Built with React and the Weather API for accurate live weather data.',
    tech: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Axios', 'Weather API'],
    icon: Cloud,
    color: 'from-emerald-500 to-teal-500',
    highlights: [
      'Real-Time Weather Forecast',
      'City Search with Error Handling',
      'Optimized React Components',
    ],
    githubUrl: 'https://github.com/Rohitkumar968',
    demoUrl: 'https://weather-app-roh.netlify.app/',
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 hero-bg opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Real-world applications built with the MERN stack
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg" asChild>
            <a href="https://github.com/Rohitkumar968" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
