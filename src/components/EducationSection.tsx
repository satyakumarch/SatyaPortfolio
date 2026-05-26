
import { School } from 'lucide-react';
import { useEffect } from 'react';

const education = [
  {
    id: 1,
    degree: 'Bachelor of Technology - Computer Science and Engineering',
    institution: 'Lovely Professional University',
    location: 'Punjab, India',
    period: '2022 - 2026',
    description: 'Currently pursuing my B.Tech degree with a focus on software development, data structures, and algorithms.'
  },
  {
    id: 2,
    degree: 'Intermediate',
    institution: 'Shree Jan Cetana Community Secondary School',
    location: 'Nepal',
    period: '2019 - 2021',
    score: '79.01%',
    description: 'Completed my intermediate education with a focus on science and mathematics.'
  },
  {
    id: 3,
    degree: 'Matriculation',
    institution: 'Shree Jan Cetana Community Secondary School',
    location: 'Nepal',
    period: '2017 - 2019',
    score: '84%',
    description: 'Completed my secondary education with distinction.'
  }
];

const EducationSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="education" className="bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Education</h2>
        
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div 
              key={edu.id} 
              className={`timeline-item reveal ${index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left'}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="timeline-dot flex items-center justify-center">
                <School size={12} className="text-white" />
              </div>
              
              <div className="glass-card p-6 mb-8 ml-4 card-hover">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold gradient-text">{edu.degree}</h3>
                    <h4 className="text-gray-200 font-medium">{edu.institution}</h4>
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                  </div>
                  
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                    {edu.score && (
                      <span className="text-sm text-portfolio-purple mt-2 font-medium">
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
