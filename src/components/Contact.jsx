import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { usePortfolioContext } from '../context/PortfolioContext';

export default function Contact() {
  const { portfolioData, isEditMode, updateSectionTitle: onUpdateTitle, updateContact: onUpdateContact } = usePortfolioContext();
  const title = portfolioData.sectionTitles.contact;
  const contactData = portfolioData.contact || {};
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(''); // '', 'success', 'error'

  const handleEditTitle = () => {
    if (!isEditMode) return;
    const newTitle = prompt("Enter new section title:", title);
    if (newTitle !== null) onUpdateTitle('contact', newTitle);
  };

  const handleEditContact = (field, currentVal) => {
    if (!isEditMode) return;
    const newVal = prompt(`Enter new ${field}:`, currentVal);
    if (newVal !== null) onUpdateContact(field, newVal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('');

    // Simulated Send
    setTimeout(() => {
      alert('Message Sent (Simulated)');
      setIsSending(false);
      setStatus('success');
      formRef.current.reset();
    }, 1500);
  };

  const contactItems = [
    { id: 'facebook', label: 'Facebook', value: contactData.facebook, icon: 'f', color: '#1877F2', linkPrefix: 'https://fb.com/' },
    { id: 'github', label: 'GitHub', value: contactData.github, icon: 'git', color: '#fff', linkPrefix: 'https://github.com/' },
    { id: 'phone', label: 'Phone', value: contactData.phone, icon: 'tel', color: '#00ff9d', linkPrefix: 'tel:' },
    { id: 'email', label: 'Email', value: contactData.email, icon: '@', color: '#ff4d4d', linkPrefix: 'mailto:' },
  ];

  return (
    <section id="contact" className="category-section perspective-container">
      <motion.div 
        className="perspective-section"
        initial={{ opacity: 0, rotateX: 10, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <span className="section-number">06</span>
          <h2 
            className={isEditMode ? 'editable' : ''} 
            onClick={handleEditTitle}
          >
            {title}
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="contact-grid">
          <div className="contact-cards-container">
            {contactItems.map((item, idx) => (
              <ContactCard 
                key={item.id}
                item={item}
                idx={idx}
                isEditMode={isEditMode}
                onEdit={() => handleEditContact(item.id, item.value)}
              />
            ))}
          </div>

          <div className="contact-form-wrapper">
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--blue)' }}>// send_transmission</h3>
              <div className="form-group glow-input">
                <label htmlFor="user_name">NAME</label>
                <input type="text" name="user_name" placeholder="IDENTIFY YOURSELF" required />
              </div>
              <div className="form-group glow-input">
                <label htmlFor="user_email">EMAIL</label>
                <input type="email" name="user_email" placeholder="COMM_CHANNEL@DOMAIN.COM" required />
              </div>
              <div className="form-group glow-input">
                <label htmlFor="message">MESSAGE</label>
                <textarea name="message" rows="4" placeholder="ENTER MESSAGE CONTENT..." required></textarea>
              </div>
              <button type="submit" className="btn neon-btn" disabled={isSending} style={{ width: '100%' }}>
                {isSending ? 'SENDING...' : 'INITIALIZE SEND'}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ContactCard({ item, idx, isEditMode, onEdit }) {
  const isExternal = item.id === 'facebook' || item.id === 'github';
  const href = item.value ? (item.value.startsWith('http') ? item.value : item.linkPrefix + item.value) : '#';

  return (
    <TiltCard className="contact-tilt-card">
      <motion.div 
        className={`contact-item-card ${isEditMode ? 'editable-card' : ''}`}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        onClick={isEditMode ? onEdit : undefined}
      >
        <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${item.color}22, transparent)` }} />
        <div className="contact-icon" style={{ borderColor: item.color, color: item.color }}>
          {item.icon}
        </div>
        <div className="contact-details">
          <span className="contact-label">{item.label}</span>
          {isEditMode ? (
            <span className="contact-value" style={{ color: 'var(--blue)' }}>{item.value || 'Click to set'}</span>
          ) : (
            <a href={href} target={isExternal ? "_blank" : undefined} rel="noopener noreferrer" className="contact-value">
              {item.value || `Set your ${item.label}`}
            </a>
          )}
        </div>
        {isEditMode && <div className="edit-indicator">✎</div>}
      </motion.div>
    </TiltCard>
  );
}
