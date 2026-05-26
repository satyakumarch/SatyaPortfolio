import { Github, Linkedin, Mail, Phone, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const heroImages = [
  '/photo1.jpeg',
  '/photo2.jpeg',
  '/photo3.jpeg',
  '/photo4.jpeg',
];

const roles = [
  'Full Stack Developer',
  'MERN Stack Enthusiast',
  'Problem Solver',
  'Open Source Contributor',
];

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [animating, setAnimating]       = useState(false);
  const [roleIndex, setRoleIndex]       = useState(0);
  const [displayed, setDisplayed]       = useState('');
  const [deleting, setDeleting]         = useState(false);

  // ── Auto-slide photos ──
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── Typewriter ──
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // ── Reveal observer ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => document.querySelectorAll('.reveal').forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16 bg-grid noise-overlay">

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-portfolio-darkblue/20 to-background z-0" />

      {/* Ambient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-portfolio-blue/20 rounded-full filter blur-3xl animate-pulse opacity-20" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-portfolio-purple/20 rounded-full filter blur-3xl animate-pulse opacity-20 animate-delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-portfolio-purple/5 rounded-full filter blur-3xl" />

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ── Left: Text ── */}
          <div className="order-2 lg:order-1">
            <p className="text-portfolio-blue font-medium mb-4 tracking-widest uppercase text-sm reveal animate-fade-in-up">
              Hello, I'm
            </p>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-4 reveal animate-fade-in-up animate-delay-300"
            >
              <span className="gradient-text-animate">Satya Kumar</span>
              <span className="text-white"> Chaudhary</span>
            </h1>

            {/* Typewriter role */}
            <p className="text-gray-200 text-xl mb-6 h-8 reveal animate-fade-in-up animate-delay-500">
              <span className="text-portfolio-lightblue font-semibold">{displayed}</span>
              <span className="typewriter-cursor text-portfolio-purple" />
            </p>

            <p className="flex items-center mb-8 text-gray-300 reveal animate-fade-in-up animate-delay-700">
              <span className="mr-2 float-badge inline-block">📍</span> Punjab, India
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 reveal animate-fade-in-up animate-delay-900 stagger-children">
              <a
                href="#contact"
                className="btn-primary magnetic-btn ripple flex justify-center items-center gap-2 hover-glow"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="btn-secondary magnetic-btn ripple flex justify-center items-center gap-2 hover-glow"
              >
                View Projects
              </a>
              <a
                href="/satyakumar.pdf"
                download
                className="btn-secondary magnetic-btn ripple flex justify-center items-center gap-2 hover:bg-portfolio-blue/10 hover-glow"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>

            {/* Social icons */}
            <div className="flex space-x-5 reveal animate-fade-in-up animate-delay-900">
              {[
                { href: 'https://github.com/satyakumarch', icon: <Github size={24} />, label: 'GitHub', delay: '' },
                { href: 'https://www.linkedin.com/in/satyakumar12/', icon: <Linkedin size={24} />, label: 'LinkedIn', delay: 'animate-delay-300' },
                { href: 'mailto:satyakumarchaudhary603@gmail.com', icon: <Mail size={24} />, label: 'Email', delay: 'animate-delay-500' },
                { href: 'tel:+918934856824', icon: <Phone size={24} />, label: 'Phone', delay: 'animate-delay-700' },
              ].map(({ href, icon, label, delay }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`text-gray-300 hover:text-white transition-all hover:scale-125 hover-wiggle animate-float ${delay}`}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Photo carousel ── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative h-80 w-80 md:h-96 md:w-96">

              {/* Outer glow pulse */}
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full opacity-20 animate-pulse" />

              {/* Orbit rings */}
              <div
                className="orbit-ring absolute"
                style={{ inset: '-16px', animationDuration: '14s' }}
              />
              <div
                className="orbit-ring absolute"
                style={{ inset: '-32px', animationDuration: '22s', animationDirection: 'reverse', opacity: 0.4 }}
              />

              {/* Spinning dashed ring */}
              <div
                className="absolute inset-1 rounded-full border-2 border-dashed border-portfolio-blue/40 animate-spin"
                style={{ animationDuration: '12s' }}
              />

              {/* Image */}
              <div className="absolute inset-4 bg-card rounded-full overflow-hidden border-2 border-portfolio-purple/50 reveal animate-scale-in">
                <img
                  key={currentImage}
                  src={heroImages[currentImage]}
                  alt="Satya Kumar Chaudhary"
                  className={`w-full h-full object-cover rounded-full transition-all duration-500 ${
                    animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 top-8 bg-portfolio-purple/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg float-badge glow-badge">
                Full Stack Dev
              </div>
              <div className="absolute -left-4 bottom-12 bg-portfolio-blue/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg float-badge glow-badge animate-delay-700">
                MERN Stack
              </div>

              {/* Dot indicators */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentImage
                        ? 'bg-portfolio-blue w-5'
                        : 'bg-gray-500 hover:bg-gray-300 w-2'
                    }`}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
