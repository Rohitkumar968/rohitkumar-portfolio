import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const connectLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Rohitkumar968',
    external: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rohitkumar58',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=rohitkumar75997@gmail.com',
    external: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    href: 'tel:+916299394952',
    external: false,
  },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1 — Name & Role */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gradient">Rohit Kumar</h3>
            <p className="text-sm text-primary font-medium">Full Stack Developer | MERN Stack Developer</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              B.Tech CSE student passionate about building modern, scalable, and responsive
              web applications using the MERN Stack and AI tools.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Connect */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href!}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.label}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-4 h-4 text-primary" />
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rohit Kumar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
