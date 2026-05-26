import { Github, Linkedin, Mail, Phone, MessageCircle, Download } from 'lucide-react';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-portfolio-darkblue/20 to-background z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-portfolio-blue/20 rounded-full filter blur-3xl animate-pulse opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-portfolio-purple/20 rounded-full filter blur-3xl animate-pulse opacity-20 animation-delay-700"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-portfolio-blue font-medium mb-4 tracking-wider reveal animate-fade-in-up">Hello, I'm</p>
            <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6 reveal animate-fade-in-up animate-delay-300">
              <span className="gradient-text">Satya Kumar</span> Chaudhary
            </h1>
            <p className="text-gray-300 text-xl mb-8 max-w-lg opacity-0 transform translate-y-4 transition-all duration-1000 ease-out animate-fade-in-up delay-500">
  <span className="text-white">Full Stack Developer</span> | MERN Stack Enthusiast | Problem Solver
</p>
            <p className="flex items-center mb-6 text-gray-300 reveal animate-fade-in-up animate-delay-700">
              <span className="mr-2">📍</span> Punjab, India
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 reveal animate-fade-in-up animate-delay-900">
              <a href="#contact" className="btn-primary flex justify-center items-center gap-2">
                Get In Touch
              </a>
              <a href="#projects" className="btn-secondary flex justify-center items-center gap-2">
                View Projects
              </a>
              <a 
                href="/satyakumar.pdf" 
                download 
                className="btn-secondary flex justify-center items-center gap-2 hover:bg-portfolio-blue/10"
              >
                <Download size={20} />
                Download CV
              </a>
            </div>
            
            <div className="flex space-x-5 reveal animate-fade-in-up animate-delay-900">
              <a
                href="https://github.com/satyakumarch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} className="animate-float" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyakumar12/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} className="animate-float animate-delay-300" />
              </a>
              <a
                href="mailto:satyakumarchaudhary603@gmail.com"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} className="animate-float animate-delay-500" />
              </a>
              <a
                href="tel:+918934856824,9779807578809"
                className="text-gray-300 hover:text-white transition-colors hover:scale-110"
                aria-label="Phone"
              >
                <Phone size={24} className="animate-float animate-delay-700" />
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative h-80 w-80 md:h-96 md:w-96">
              <div className="absolute inset-0 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-card rounded-full overflow-hidden border-2 border-portfolio-purple/50 reveal animate-scale-in">
                <img 
                  src="/lovable-uploads/e39e6987-8e00-4ba0-9ebb-bacdf5da0b42.png" 
                  alt="Satya Kumar Chaudhary"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
