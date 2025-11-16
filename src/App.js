import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Send } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    {
      title: "Project One",
      description: "A full-stack blog post application",
      technologies: ["React", "Node.js", "PostgreSQL"],
      github: "https://github.com/narin17/Backend_Project_BlogPost"
    },
    {
      title: "Project Two",
      description: "DBA Dashboard for managing database operations",
      technologies: ["Python", "PostgreSQL"],
      github: "https://github.com/narin17/DBA_Dashboard"
    },
    {
      title: "Project Three",
      description: "Web Scraping Capstone - Data Entry Job Automation",
      technologies: ["Python",],
      github: "https://github.com/narin17/Web-Scraping-Capstone---Data-Entry-Job-Automation"
    },
    {
      title: "More:",
      technologies: [],
      github: "https://github.com/narin17"
    }
  ];

  const skills = [
    "JavaScript", "React", "Node.js", "Hadoop", "PostgreSQL",
    "Git","GitHub", "Excel", "MySQL", "Express", "Tailwind CSS", "Sequelize", "Python"
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-800">NR17</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-gray-900">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-gray-900">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-gray-900">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <button onClick={() => scrollToSection('about')} className="block py-2 text-gray-600 hover:text-gray-900">About</button>
              <button onClick={() => scrollToSection('projects')} className="block py-2 text-gray-600 hover:text-gray-900">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="block py-2 text-gray-600 hover:text-gray-900">Skills</button>
              <button onClick={() => scrollToSection('contact')} className="block py-2 text-gray-600 hover:text-gray-900">Contact</button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Un Titnarin</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Data Science Student 
          </p>
          <div className="flex justify-center space-x-4">
            <a href="https://github.com/narin17" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com/in/untithnarin" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition">
              <Linkedin size={28} />
            </a>
            <a href="https://t.me/untithnarin17" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition">
              <Send size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I'm a passionate Data Science student with a strong foundation in programming and a keen interest
            in developing innovative solutions. My journey in tech started with web development, and I've since 
            expanded my skills to include data analysis and machine learning.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects,
            and collaborating with like-minded individuals. I'm always eager to learn and take on new challenges 
            that push me to grow both personally and professionally.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 flex items-center">
                    <Github size={18} className="mr-1" /> Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-100 text-gray-800 text-lg px-6 py-3 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <a 
            href="mailto:untithnarin17@gmail.com" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 untithnarin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}