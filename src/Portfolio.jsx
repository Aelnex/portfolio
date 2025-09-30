import React from "react";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const profile = {
  name: "Trin Tantrakul",
  role: "Student • Web Developer",
  email: "manuiopface@gmail.com",
  github: "https://github.com/Aelnex",
  linkedin: "https://linkedin.com/in/trin-tantrakul", // เพิ่ม LinkedIn
  image: "https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID?v=4" // 👉 เปลี่ยนเป็น GitHub avatar หรือใช้ URL รูปของคุณ
};

const projects = [
  {
    title: "TADDO AI",
    description: "เว็บไซต์ที่นำไปแข่งขัน พัฒนาด้วย HTML, CSS, Javascript และ React",
    link: "https://aelnex.github.io/pruning-ai/",
    code: "https://github.com/Aelnex/pruning-ai",
    image: "https://media.discordapp.net/attachments/995243160861159474/1422605616915943455/image.png?ex=68dd4839&is=68dbf6b9&hm=1bbdf251d9614fd2ca7d13f145fa1cb2bd6fcf79604cb1053845ce4d74ba0f6c&=&format=webp&quality=lossless" // placeholder รูปสวยๆ
  },
  {
    title: "My Weather",
    description: "โครงงานวิเคราะห์ข้อมูลแบบสอบถามด้วย Python (Pandas, Matplotlib) และทำเว็บรายงานผล",
    link: "https://aelnex.github.io/myweather/", // 👉 ใส่ลิงก์จริงตรงนี้เมื่อมี demo
    code: "https://github.com/Aelnex/myweather",
    image: "https://media.discordapp.net/attachments/995243160861159474/1422606130059939850/image.png?ex=68dd48b4&is=68dbf734&hm=ce45b92e3061c63173d0842b2c0f834c597974b04951b45d19719de80a9878e7&=&format=webp&quality=lossless" // placeholder รูปกราฟ
  },
];

const skills = [
  "HTML", "CSS", "JavaScript", "Python", "React", "TailwindCSS", "Git", "GitHub"
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
        <h1 className="font-bold text-xl text-gray-800">{profile.name}</h1>
        <nav className="flex gap-6 text-sm" aria-label="Main navigation">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
          <a href="#skills" className="hover:text-blue-600 transition">Skills</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>
      </header>

      {/* Hero / About Me */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <img
          src={profile.image}
          alt={`${profile.name} - Profile Photo`}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
          onError={(e) => {
            e.target.src = "https://ui-avatars.com/api/?name=Trin+Tantrakul&size=128&background=3b82f6&color=fff";
          }}
        />
        <h2 className="text-3xl font-bold mb-2">{profile.name}</h2>
        <p className="text-gray-600 mb-6">{profile.role}</p>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          I'm a student passionate about web development. I enjoy building 
         user-friendly websites using HTML, CSS, JavaScript, Python, and React. 
         Always learning and exploring new technologies to create better digital experiences.
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 border rounded-lg hover:bg-gray-800 hover:text-white transition"
            aria-label="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href={`mailto:${profile.email}`}
            className="p-2 border rounded-lg hover:bg-blue-600 hover:text-white transition"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={index}
              className="bg-white border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={project.image} 
                alt={`${project.title} screenshot`}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">{project.description}</p>
                <div className="flex gap-4">
                  {project.link !== "#" && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                  <a 
                    href={project.code} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm font-medium transition"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span 
              key={skill} 
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-medium hover:border-blue-500 hover:text-blue-600 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
        <div className="bg-white rounded-2xl p-8 shadow-md text-center max-w-md mx-auto">
          <p className="text-gray-700 mb-6">สนใจติดต่อหรือทำงานร่วมกัน ติดต่อได้ทาง:</p>
          <div className="space-y-3">
            <a 
              href={`mailto:${profile.email}`} 
              className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
            >
              <Mail className="w-5 h-5" />
              {profile.email}
            </a>
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t bg-white/50">
        <p>© {new Date().getFullYear()} {profile.name}. Built with React & TailwindCSS</p>
      </footer>
    </div>
  );
}
