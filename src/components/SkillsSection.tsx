import { useEffect } from 'react';

const skills = [
  { category: 'Languages',      items: ['JavaScript', 'C++', 'Java', 'SQL'],                    level: 85 },
  { category: 'Frameworks',     items: ['NodeJS', 'Express', 'ReactJS', 'Tailwind'],             level: 88 },
  { category: 'Databases',      items: ['MongoDB', 'MySQL'],                                     level: 80 },
  { category: 'Tools',          items: ['Git', 'GitHub', 'VS Code'],                             level: 90 },
  { category: 'CS Fundamentals',items: ['CN', 'DBMS', 'OS', 'DSA', 'OOPS'],                     level: 82 },
  { category: 'Soft Skills',    items: ['Communication', 'Teamwork', 'Problem-solving'],         level: 92 },
];

const SkillsSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => document.querySelectorAll('.reveal').forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="skills" className="bg-background relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-portfolio-blue/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading reveal">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skillGroup, index) => (
            <div
              key={index}
              className="skill-card tilt-card hover-glow reveal animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Shimmer overlay */}
              <div className="shimmer-overlay" />

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold gradient-text">{skillGroup.category}</h3>
                <span className="text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded-full">
                  {skillGroup.level}%
                </span>
              </div>

              {/* Skill bar */}
              <div className="skill-bar-track mb-4">
                <div
                  className="skill-bar-fill"
                  style={{ '--skill-level': `${skillGroup.level}%` } as React.CSSProperties}
                />
              </div>

              <div className="flex flex-wrap gap-2 stagger-children">
                {skillGroup.items.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-white/5 text-gray-200 px-3 py-1.5 rounded-full text-sm
                               transition-all hover:bg-portfolio-purple/20 hover:-translate-y-1
                               hover:text-white hover:shadow-md cursor-default glow-badge"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
