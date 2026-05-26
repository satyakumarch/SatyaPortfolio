
import { useState, useEffect } from 'react';
import ProjectModal, { ProjectType } from './ProjectModal';

const projects: ProjectType[] = [

   {
  id: 1,
  title: 'AgriAssist – Weather Forecast and Farming Advisory System',
  description: 'A web-based platform designed to assist farmers with real-time weather forecasts and personalized farming advisories, helping them make informed agricultural decisions.',
  image: 'agri.png',
  technologies: ["TypeScript", "CSS", "JavaScript", "HTML"],
  features: [
    'Farmer registration and role-based login system',
    'Real-time weather updates using OpenWeatherMap API',
    'Localized crop and farming advisories',
    'Admin dashboard for managing users and advisories',
    'Automated weather alerts and 5-day forecast integration'
  ],
  githubLink:'https://github.com/satyakumarch/agriculture',
  liveLink:'https://croptechx.vercel.app/'
},

  {
    id: 2,
    title: 'Food Hub Website',
    description: 'A comprehensive homestay booking platform that allows users to browse, book, and review homestay options in various locations.',
    image: 'food.png'
    ,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: [
      'User authentication and profile management',
      'Advanced search and filtering options',
      'Secure payment processing',
      'Review and rating system',
      'Host dashboard for property management'
    ],
    githubLink: 'https://github.com/satyakumarch/FoodHub',
    liveLink: 'https://foodhub975.netlify.app/'
  },
  {
    id: 3,
    title: 'E-Commerce Website',
    description: 'A feature-rich online shopping platform offering a seamless browsing and purchasing experience for users across various product categories.',
    image: 'ecom.png',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    features: [
      'Responsive product catalog with filtering',
      'Shopping cart and wishlist functionality',
      'Secure checkout process',
      'Order tracking and history',
      'Admin dashboard for inventory management'
    ],
    githubLink: 'https://github.com/satyakumarch/ECommerce',
    liveLink: 'https://ecommercesatya.netlify.app/'
  },
  {
    id: 4,
    title: 'School Website - SJCSS',
    description: 'A professional and engaging website for Shree Janchetana Community Secondary School, designed to showcase academic excellence, student life, and school services, while encouraging admissions through an intuitive user experience.',
    image: 'school.png', // Assuming you have saved the school image as sjcss.png
    technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Hero section highlighting the school’s mission and vision',
      'Smooth navigation with sections like Home, About Us, Services, Academics, and Alumni',
      'Call-to-action buttons for admissions and school exploration',
      'Student success statistics and achievements display',
      'Responsive and accessible design across all devices'
    ],
    githubLink: 'https://github.com/satyakumarch/SJCSS', // Replace with your actual GitHub link
    liveLink: 'https://sjcss.netlify.app/' // Replace with your actual live site link
  },
  {
  id: 5,
  title: 'Lautan Ram Devi School Website',
  description: 'A modern, responsive school website for Lautan Ram Devi School, designed to showcase academic excellence, school activities, admissions information, and student achievements with an intuitive and user-friendly interface for students, parents, and visitors.',
  image: 'school.png',
  technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
  features: [
    'Clean and user-friendly navigation menu with Home, About School, Academics, Admissions, Gallery, and Contact sections',
    'Attractive hero section showcasing the school vision, quality education, and student achievements',
    'Responsive design optimized for desktop, tablet, and mobile devices',
    'Student and parent portal access with notices, announcements, and academic updates',
    'Interactive admission section with clear “Apply Now” call-to-action button',
    'Gallery section highlighting school events, cultural programs, sports, and campus life',
    'Faculty and staff information display for better communication and transparency',
    'Integrated contact form and social media links for easy parent-school interaction'
  ]
}
    githubLink: 'https://github.com/NepaSatyaTech/edu-haven-dash',
    liveLink: 'https://lautandevi.vercel.app/#'
  
  

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

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

  const openModal = (project: ProjectType) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <h2 className="section-heading reveal">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-card card-hover reveal animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
              onClick={() => openModal(project)}
            >
              <div className="w-full h-48 bg-portfolio-darkblue rounded-t-xl overflow-hidden flex items-center justify-center cursor-pointer reveal animate-fade-in-up animate-delay-300">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 reveal animate-fade-in-left animate-delay-500">{project.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3 reveal animate-fade-in-up animate-delay-700">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="bg-portfolio-blue/10 text-portfolio-lightblue px-2.5 py-1 rounded-full text-xs reveal animate-bounce-in"
                      style={{ animationDelay: `${(index * 200) + (i * 100)}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="bg-portfolio-purple/10 text-portfolio-lightblue px-2.5 py-1 rounded-full text-xs reveal animate-bounce-in animate-delay-900">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                  className="btn-primary w-full reveal animate-slide-up animate-delay-900"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>

  );
};

export default ProjectsSection;
