import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="text-lg font-bold text-gradient"
          >
            Rohit Kumar
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`nav-link ${activeSection === item.href.slice(1) ? 'text-foreground active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/Rohitkumar968"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rohitkumar58"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="glass-card p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary'
                }`}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <a
                href="https://github.com/Rohitkumar968"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rohitkumar58"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:rohitkumar75997@gmail.com"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
