import React, { useState, useEffect } from "react";
import { Github, Mail, ExternalLink, ArrowUp, Sparkles, Code2, Palette, GraduationCap, Calendar } from "lucide-react";

const profile = {
  name: "Trin Tantrakul",
  role: "Student • Web Developer",
  email: "manuiopface@gmail.com",
  github: "https://github.com/Aelnex",
  linkedin: "https://linkedin.com/in/trin-tantrakul",
  image: "https://media.discordapp.net/attachments/995243160861159474/1422642686841585785/PUI_2698.jpg?ex=68dd6abf&is=68dc193f&hm=68b5dbebe3e7cc11915271e229e0e60f5fb7c1a2883319273533036598f51991&=&format=webp&width=640&height=960"
};

const projects = [
  {
    title: "TADDO AI",
    description: "เว็บไซต์ที่นำไปแข่งขัน พัฒนาด้วย HTML, CSS, Javascript และ React",
    link: "https://aelnex.github.io/pruning-ai/",
    code: "https://github.com/Aelnex/pruning-ai",
    image: "https://media.discordapp.net/attachments/995243160861159474/1422605616915943455/image.png?ex=68dd4839&is=68dbf6b9&hm=1bbdf251d9614fd2ca7d13f145fa1cb2bd6fcf79604cb1053845ce4d74ba0f6c&=&format=webp&quality=lossless",
    tags: ["React", "JavaScript", "HTML/CSS"]
  },
  {
    title: "My Weather",
    description: "โครงงานวิเคราะห์ข้อมูลแบบสอบถามด้วย Python (Pandas, Matplotlib) และทำเว็บรายงานผล",
    link: "https://aelnex.github.io/myweather/",
    code: "https://github.com/Aelnex/myweather",
    image: "https://media.discordapp.net/attachments/995243160861159474/1422606130059939850/image.png?ex=68dd48b4&is=68dbf734&hm=ce45b92e3061c63173d0842b2c0f834c597974b04951b45d19719de80a9878e7&=&format=webp&quality=lossless",
    tags: ["Python", "Data Analysis"]
  },
];

const education = [
  {
    school: "Chakkam Khanathon Lamphun School",
    degree: "High School",
    field: "English Program",
    period: "2019 - now",
    description: "Focused on computer . Participated in coding competitions and developed web applications.",
    achievements: [
      "GPA: 3.67/4.0",
      "Member of HPC Ignite",
      "Member of Association for Computing Machinery (ACM)"
    ]
  },
];

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "Python", level: 75 },
  { name: "React", level: 70 },
  { name: "TailwindCSS", level: 85 },
  { name: "Git", level: 75 },
  { name: "GitHub", level: 80 }
];

export default function Portfolio() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      const sections = ['about', 'projects', 'education', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-50 px-6 py-4 shadow-lg shadow-blue-500/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          <nav className="flex gap-6 text-sm" aria-label="Main navigation">
            {['about', 'projects', 'education', 'skills', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                className={`capitalize transition-all duration-300 ${
                  activeSection === section 
                    ? 'text-blue-400 font-semibold' 
                    : 'text-gray-400 hover:text-blue-400'
                }`}
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-20 text-center relative">
        <div className="relative inline-block mb-8 animate-float">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-2xl opacity-20"></div>
          <img
            src={profile.image}
            alt={`${profile.name} - Profile Photo`}
            className="relative w-40 h-40 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-2xl shadow-blue-500/30"
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=Trin+Tantrakul&size=160&background=3b82f6&color=fff";
            }}
          />
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-2 rounded-full shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
          {profile.name}
        </h2>
        <p className="text-xl text-gray-300 mb-8 font-medium">{profile.role}</p>
        
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg mb-8">
          I'm a student passionate about web development. I enjoy building 
          user-friendly websites using HTML, CSS, JavaScript, Python, and React. 
          Always learning and exploring new technologies to create better digital experiences.
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
          </a>
          <a 
            href={`mailto:${profile.email}`}
            className="group p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1"
            aria-label="Send Email"
          >
            <Mail className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" />
            My Work
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400">Check out some of my recent work</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/20 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/40"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.title} screenshot`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-2xl mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  {project.link !== "#" && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <a 
                    href={project.code} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 border-2 border-blue-500/30 text-gray-300 rounded-lg text-sm font-medium hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4" />
            My Journey
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Education
          </h2>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <article
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border-2 border-blue-500/20 rounded-3xl p-8 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:border-blue-400/40"
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
                        {edu.school}
                      </h3>
                      <p className="text-lg text-blue-400 font-semibold">
                        {edu.degree} • {edu.field}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">{edu.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"></div>
                        <p className="text-gray-300 text-sm">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Palette className="w-4 h-4" />
            What I Do
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400">Technologies I work with</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl shadow-blue-500/5 border-2 border-blue-500/20">
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-sm font-bold text-blue-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-500/50"
                    style={{ 
                      width: `${skill.level}%`,
                      animation: 'slideIn 1s ease-out forwards'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-400">Feel free to reach out for collaborations or just a chat</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-1 shadow-2xl shadow-blue-500/30">
          <div className="bg-slate-900 rounded-3xl p-8 text-center">
            <p className="text-gray-300 mb-6 text-lg">สนใจติดต่อหรือทำงานร่วมกัน ติดต่อได้ทาง:</p>
            <div className="space-y-4">
              <a 
                href={`mailto:${profile.email}`} 
                className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Mail className="w-5 h-5" />
                {profile.email}
              </a>
              <a 
                href={profile.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 bg-slate-800 border-2 border-blue-500/30 text-gray-300 rounded-xl font-medium hover:bg-slate-700 hover:border-blue-400 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                Follow on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-blue-500/20 bg-slate-900/50 backdrop-blur-sm">
        <p className="mb-2">© {new Date().getFullYear()} {profile.name}</p>
        <p className="text-xs">Built with ❤️ using React & TailwindCSS</p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          25% { 
            transform: translate(20px, -50px) scale(1.1); 
          }
          50% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
          75% { 
            transform: translate(50px, 50px) scale(1.05); 
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }

        @keyframes slideIn {
          from { 
            width: 0; 
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}