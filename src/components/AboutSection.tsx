import { Code2, Database, Zap, Target, Brain } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Builds',
    description: 'React, Node.js, Express.js, and REST APIs',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'MongoDB Atlas with Mongoose & CRUD ops',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Groq AI, Gemini, Claude & ChatGPT',
  },
  {
    icon: Zap,
    title: 'Fast Learner',
    description: 'Quickly adapting to new technologies',
  },
  {
    icon: Target,
    title: 'Detail Oriented',
    description: 'Clean code and user-friendly interfaces',
  },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 hero-bg opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            About <span className="text-gradient">Me</span>
          </h2>
          <p className={`section-subtitle ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            Get to know me better
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-4 text-gradient">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                I am a B.Tech Computer Science student with a strong foundation in Full Stack Web
                Development using the MERN Stack. I enjoy building scalable, responsive, and
                user-friendly web applications using React.js, Node.js, Express.js, MongoDB,
                JavaScript, TypeScript, Tailwind CSS, and modern development tools.
              </p>
            </div>

            <div className="glass-card">
              <h3 className="text-xl font-semibold mb-4 text-gradient">Career Objective</h3>
              <p className="text-muted-foreground leading-relaxed">
                I am passionate about learning new technologies and looking for opportunities as a
                Full Stack Developer, Frontend Developer, or Software Engineer where I can apply my
                technical skills and contribute to building high-quality software solutions.
              </p>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-4 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`glass-card text-center group ${index === 4 ? 'col-span-2 sm:col-span-1 sm:col-start-1' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
