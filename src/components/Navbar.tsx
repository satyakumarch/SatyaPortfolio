import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home',       href: '#home'         },
  { name: 'About',      href: '#about'        },
  { name: 'Experience', href: '#experience'   },
  { name: 'Projects',   href: '#projects'     },
  { name: 'Skills',     href: '#skills'       },
  { name: 'Education',  href: '#education'    },
  { name: 'Contact',    href: '#contact'      },
];

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold gradient-text-animate hover:scale-105 transition-transform"
          >
            Satya<span className="text-portfolio-purple">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const sectionId = link.href.replace('#', '');
              const isActive  = activeSection === sectionId;
              return (
                <li
                  key={link.name}
                  className="animate-fade-in-down"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <a
                    href={link.href}
                    className={`relative group transition-colors ${
                      isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Underline */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-portfolio-blue to-portfolio-purple rounded-full transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                    {/* Active dot */}
                    {isActive && (
                      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-portfolio-purple animate-pulse" />
                    )}
                  </a>
                </li>
              );
            })}
            <li className="animate-bounce-in animate-delay-700">
              <a href="#contact" className="btn-primary text-sm magnetic-btn ripple hover-glow">
                Let's Talk
              </a>
            </li>
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white hover:text-portfolio-purple transition-colors hover-wiggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-secondary/95 backdrop-blur-lg mt-2 rounded-lg p-4 animate-flip-in border border-white/10">
            <ul className="flex flex-col space-y-2 stagger-children active">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`block py-2 px-4 rounded transition-colors ${
                        isActive
                          ? 'bg-portfolio-purple/20 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#contact"
                  className="btn-primary block text-center ripple"
                  onClick={() => setIsOpen(false)}
                >
                  Let's Talk
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
