import React from 'react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (Demo mode)');
    e.target.reset();
  };

  return (
    <section id="contact" className="category-section reveal-section contact-section">
      <div className="crt-overlay"></div>
      <div className="section-header">
        <span className="section-number">06</span>
        <h2>// Contact</h2>
        <div className="section-line"></div>
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <h3 className="contact-title">Let's Build Something Together</h3>
          <p className="contact-desc">Have a project in mind? Drop me a message and let's collaborate.</p>
        </div>
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
          <div className="form-group glow-input">
            <label htmlFor="contact-name">// name</label>
            <input type="text" id="contact-name" placeholder="John Doe" required />
          </div>
          <div className="form-group glow-input">
            <label htmlFor="contact-email">// email</label>
            <input type="email" id="contact-email" placeholder="john@example.com" required />
          </div>
          <div className="form-group glow-input">
            <label htmlFor="contact-message">// message</label>
            <textarea id="contact-message" rows="4" placeholder="Tell me about your project..." required></textarea>
          </div>
          <button type="submit" className="btn neon-btn send-btn">
            <span className="btn-text">Send Message</span>
            <span className="btn-scan"></span>
          </button>
        </form>
      </div>
    </section>
  );
}
