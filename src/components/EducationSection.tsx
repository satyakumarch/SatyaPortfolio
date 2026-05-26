import { School } from 'lucide-react';
import { useEffect, useRef } from 'react';

const education = [
  {
    id: 1,
    degree: 'Bachelor of Technology - Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    period: '2022 - 2026',
    description: 'Currently pursuing my B.Tech degree with a focus on software development, data structures, and algorithms.',
  },
  {
    id: 2,
    degree: 'Intermediate',
    institution: 'Shree Jan Cetana Community Secondary School',
    location: 'Nepal',
    period: '2019 - 2021',
    score: '79.01%',
    description: 'Completed my intermediate education with a focus on science and mathematics.',
  },
  {
    id: 3,
    degree: 'Matriculation',
    institution: 'Shree Jan Cetana Community Secondary School',
    location: 'Nepal',
    period: '2017 - 2019',
    score: '84%',
    description: 'Completed my secondary education with distinction.',
  },
];

const EducationSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const lineObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate'); }),
      { threshold: 0.2 }
    );
    if (timelineRef.current) lineObs.observe(timelineRef.current);

    return () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.unobserve(el));
      if (timelineRef.current) lineObs.unobserve(timelineRef.current);
    };
  }, []);

  return (
    <section id="education" className="bg-secondary/30 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-portfolio-purple/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading reveal">Education</h2>

        <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
          <div className="timeline-line" />

          {education.map((edu, index) => (
            <div
              key={edu.id}
              className={`timeline-item reveal ${index % 2 === 0 ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="timeline-dot flex items-center justify-center hover-wiggle">
                <School size={12} className="text-white" />
              </div>

              <div className="glass-card p-6 mb-8 ml-4 card-hover tilt-card hover-glow relative overflow-hidden">
                <div className="shimmer-overlay" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold gradient-text">{edu.degree}</h3>
                    <h4 className="text-gray-200 font-medium">{edu.institution}</h4>
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full glow-badge">
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="text-sm text-portfolio-purple font-semibold neon-text">
                        Score: {edu.score}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-300">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
