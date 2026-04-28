import React, { useEffect, useRef } from 'react';

export default function Skills() {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;
    const terminal = terminalRef.current;
    
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = terminal.querySelectorAll('.skill-fill');
          fills.forEach((fill, i) => {
            setTimeout(() => {
              fill.style.width = fill.dataset.level + '%';
            }, i * 150);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    obs.observe(terminal);
    return () => obs.disconnect();
  }, []);

  const frontendSkills = [
    { name: 'HTML / CSS', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'React / Next.js', level: 80 },
    { name: 'Vue.js', level: 70 },
  ];

  const backendSkills = [
    { name: 'Node.js', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'SQL / NoSQL', level: 75 },
  ];

  const toolsSkills = [
    { name: 'Git / GitHub', level: 85 },
    { name: 'Docker', level: 60 },
    { name: 'Figma / UI Design', level: 75 },
  ];

  let delayCounter = 0;

  const renderSkillRow = (skill) => {
    const delay = delayCounter++;
    return (
      <div key={skill.name} className="skill-row reveal-item" data-delay={delay}>
        <span className="skill-prompt">&gt;</span>
        <span className="skill-name">{skill.name}</span>
        <div className="skill-bar"><div className="skill-fill" data-level={skill.level}></div></div>
        <span className="skill-percent">{skill.level}%</span>
      </div>
    );
  };

  return (
    <section id="skills" className="category-section reveal-section">
      <div className="section-header">
        <span className="section-number">02</span>
        <h2>// Skills</h2>
        <div className="section-line"></div>
      </div>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">skills.sh — ~/portfolio</span>
        </div>
        <div className="terminal-body" id="skills-terminal" ref={terminalRef}>
          <div className="terminal-line comment">// Frontend Technologies</div>
          {frontendSkills.map(renderSkillRow)}
          
          <div className="terminal-line comment">// Backend Technologies</div>
          {backendSkills.map(renderSkillRow)}
          
          <div className="terminal-line comment">// Tools & Others</div>
          {toolsSkills.map(renderSkillRow)}
          
          <div className="terminal-line blink-line">
            <span className="skill-prompt">&gt;</span>
            <span className="terminal-cursor-block">_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
