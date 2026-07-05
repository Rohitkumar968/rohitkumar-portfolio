import { useEffect, useState } from 'react';
import { Download, ExternalLink, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

const roles = ['Full Stack Developer', 'MERN Stack Developer', 'React.js Developer', 'Node.js Developer', 'Final Year CSE Student'];
const stack = ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Groq AI', 'JWT'];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentRole.length) {
            setDisplayText(currentRole.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1800);
          }
        } else if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      },
      isDeleting ? 45 : 90
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="absolute inset-0 hero-bg opacity-70" />
      <div className="hero-aurora" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center px-2 md:px-8">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-lg text-sm mb-8 animate-fade-in-down">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Siwan, Bihar, India · Open to Full-Time Software Developer Roles</span>
          </div>

          <p className="text-sm font-semibold uppercase text-primary mb-4 animate-fade-in-up">
            Full Stack MERN Developer Portfolio
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Hi, I'm <span className="text-gradient hero-name">Rohit Kumar</span>
          </h1>

          <div className="h-12 md:h-14 flex items-center justify-center mb-8">
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-mono">
              <span className="text-primary">&lt;</span>
              {displayText}
              <span className="animate-pulse">|</span>
              <span className="text-primary">/&gt;</span>
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
            B.Tech Computer Science student with a strong foundation in Full Stack Web Development
            using the MERN Stack. I build scalable, responsive, and user-friendly web applications
            using React.js, Node.js, Express.js, MongoDB, TypeScript, and Tailwind CSS.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-up delay-300">
            <Button variant="hero" size="xl" className="hero-cta" onClick={scrollToProjects}>
              <ExternalLink className="w-5 h-5" />
              View Projects
            </Button>
            <Button variant="heroOutline" size="xl" className="hero-cta" asChild>
              <a href="/rohit%20resume.pdf" download="Rohit_Kumar_Resume.pdf">
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up delay-400">
            <a href="https://github.com/Rohitkumar968" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full glass hover:bg-primary/10 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/rohitkumar58" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-full glass hover:bg-primary/10 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up delay-500">
            {stack.map((item, index) => (
              <span
                key={item}
                className="skill-badge"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="hero-profile-panel mt-10 text-left animate-fade-in-up delay-600">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4 mb-4">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Developer Profile</p>
              </div>
              <span className="text-xs text-primary bg-primary/10 border border-primary/20 rounded-lg px-3 py-1">
                Available
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Primary Stack</p>
                <p className="font-medium">MERN Stack</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Seeking</p>
                <p className="font-medium">Full Stack / Frontend Dev</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Education</p>
                <p className="font-medium">B.Tech CSE · 2022–2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
