import { useEffect } from 'react';

const stats = [
  { value: 2,  suffix: '+', label: 'Years of Experience' },
  { value: 10, suffix: '+', label: 'Projects Completed'  },
  { value: 5,  suffix: '+', label: 'Technologies'        },
  { value: 2,  suffix: '+', label: 'Internships'         },
];

const AboutSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => document.querySelectorAll('.reveal').forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-portfolio-purple/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading mb-16 reveal">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── Left: Bio card ── */}
          <div className="lg:order-1 order-2">
            <div className="relative reveal animate-slide-in-left">
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-lg transform -translate-x-2 translate-y-2 -z-10 opacity-60" />
              <div className="glass-card p-8 hover-glow tilt-card relative overflow-hidden">
                <div className="shimmer-overlay" />

                <p className="text-xl font-medium mb-4 gradient-text-animate reveal animate-fade-in-up animate-delay-300">
                  Who am I?
                </p>
                <p className="text-gray-300 mb-5 reveal animate-fade-in-up animate-delay-500 leading-relaxed">
                  I'm a Computer Science and Engineering student from Lovely Professional University in Punjab, India,
                  with a passion for web development and problem solving. My journey in tech began with curiosity and
                  has evolved into a deep love for creating innovative web solutions.
                </p>
                <p className="text-gray-300 mb-5 reveal animate-fade-in-up animate-delay-700 leading-relaxed">
                  With expertise in the MERN stack (MongoDB, Express, React, Node.js), I enjoy building full-stack
                  applications that solve real-world problems. I'm constantly learning and exploring new technologies
                  to enhance my skills.
                </p>
                <p className="text-gray-300 reveal animate-fade-in-up animate-delay-900 leading-relaxed">
                  When I'm not coding, you can find me exploring new tech trends, contributing to open-source
                  projects, or enhancing my problem-solving skills through competitive programming.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Stats + CTA ── */}
          <div className="lg:order-2 order-1">
            <div className="grid grid-cols-2 gap-4 reveal animate-slide-in-right stagger-children">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card p-6 text-center card-hover tilt-card hover-glow relative overflow-hidden"
                >
                  <div className="shimmer-overlay" />
                  <h3 className="text-3xl font-bold gradient-text mb-2">
                    <span data-count={stat.value} data-suffix={stat.suffix}>0{stat.suffix}</span>
                  </h3>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center lg:justify-start reveal animate-bounce-in animate-delay-500">
              <a href="#contact" className="btn-primary magnetic-btn ripple hover-glow">
                Let's Connect
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
