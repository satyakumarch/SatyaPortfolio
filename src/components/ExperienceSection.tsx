import { Briefcase } from 'lucide-react';
import { useEffect, useRef } from 'react';

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'Intern Elite',
    period: 'Dec 2023 - Feb 2024',
    description: [
      'Developed responsive web applications using the MERN stack',
      'Collaborated with senior developers to implement new features',
      'Optimized application performance and fixed UI/UX issues',
      'Participated in code reviews and team meetings',
    ],
  },
  {
    title: 'On-the-job Training (OJT) Intern',
    company: 'Nepal Telecom',
    period: 'Sept 2021 - Mar 2022',
    description: [
      'Assisted in the maintenance of telecommunication network systems',
      'Learned about network protocols and infrastructure',
      'Helped with technical documentation and reporting',
      'Gained hands-on experience with telecom equipment',
    ],
  },
];

const ExperienceSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Animate timeline line
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
    <section id="experience" className="bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-portfolio-blue/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading reveal">Experience & Internships</h2>

        <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
          {/* Animated timeline line */}
          <div className="timeline-line" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item reveal ${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="timeline-dot flex items-center justify-center hover-wiggle">
                <Briefcase size={12} className="text-white" />
              </div>

              <div className="glass-card p-6 mb-8 ml-4 card-hover tilt-card hover-glow relative overflow-hidden">
                <div className="shimmer-overlay" />

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                  <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full mt-2 md:mt-0 glow-badge">
                    {exp.period}
                  </span>
                </div>

                <h4 className="text-gray-200 font-semibold mb-4">{exp.company}</h4>

                <ul className="list-disc list-inside text-gray-300 space-y-2 stagger-children">
                  {exp.description.map((item, i) => (
                    <li key={i} className="pl-2 hover:text-white transition-colors">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
