import { GraduationCap, Award, Calendar, MapPin, Briefcase } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const education = [
  {
    degree: 'B.Tech Computer Science & Engineering',
    institution: 'Universal Institute of Engineering & Technology',
    board: 'IKG Punjab Technical University',
    period: '2022 – 2026',
    grade: 'CGPA: 7.62/10',
    icon: GraduationCap,
  },
  {
    degree: 'Intermediate (XII)',
    institution: 'BSEB Patna',
    board: '',
    period: '2022',
    grade: '63.6%',
    icon: Award,
  },
  {
    degree: 'Matriculation (X)',
    institution: 'BSEB Patna',
    board: '',
    period: '2020',
    grade: '65.6%',
    icon: Award,
  },
];

const training = [
  {
    title: 'Full Stack Developer Trainee',
    organization: 'Future Finder Pvt. Ltd., Mohali',
    period: 'January 2026 – June 2026',
    description:
      'Completed 6 months of Full Stack Developer training by building the TravelNest AI project using the MERN Stack, JWT Authentication, MongoDB, Express.js, React.js, Node.js, and Groq AI while following the Software Development Life Cycle (SDLC).',
  },
];

const certifications = [
  {
    title: 'MERN Stack Development',
    organization: 'Future Finder Pvt. Ltd.',
    period: '2026',
    description: 'Certified in Full Stack MERN development covering React.js, Node.js, Express.js, MongoDB, JWT, and AI integration.',
  },
  {
    title: 'Introduction to Front-End Development',
    organization: 'Simplilearn SkillUp',
    period: '2024',
    description: 'Completed front-end development fundamentals including HTML5, CSS3, JavaScript, and responsive design principles.',
  },
];

export function EducationSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-6" ref={ref}>
        <div className="text-center mb-16">
          <h2 className={`section-title ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Education & <span className="text-gradient">Training</span>
          </h2>
          <p className={`section-subtitle ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
            My academic background, industrial training, and certifications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>
            <div className="space-y-6 relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />

              {education.map((item, index) => (
                <div
                  key={item.degree}
                  className="glass-card ml-12 relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -left-[3.25rem] top-6 w-4 h-4 rounded-full bg-primary glow" />

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.degree}</h4>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {item.institution}
                      </p>
                      {item.board && (
                        <p className="text-muted-foreground text-xs mt-0.5">{item.board}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-3">
                        <span className="text-xs flex items-center gap-1 text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training & Certifications */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-primary" />
              Industrial Training
            </h3>
            <div className="space-y-6 mb-10">
              {training.map((item, index) => (
                <div
                  key={item.title}
                  className="glass-card group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-primary text-sm">{item.organization}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full flex-shrink-0">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
              <Award className="w-6 h-6 text-accent" />
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className="glass-card group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-primary text-sm">{cert.organization}</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full flex-shrink-0">
                      {cert.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
