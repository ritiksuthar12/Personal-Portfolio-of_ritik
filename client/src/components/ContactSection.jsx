import React, { useState } from 'react';
import { Mail, MapPin, Send, PhoneCall, CheckCircle2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './TechIcons';
import { api } from '../services/api';

export default function ContactSection({ notify }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      notify('Please fill out all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.sendMessage(formData);
      setSubmitted(true);
      notify('Message sent successfully! Ritik will get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      notify(err.message || 'Failed to send message', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header-center">
        <p className="section-eyebrow">
          GET IN TOUCH
        </p>
        <h2 className="section-headline">
          Let's Build Something Exceptional
        </h2>
        <p className="section-subtitle-text">
          Have an interesting project idea, freelance opportunity, or just want to chat tech? Reach out anytime!
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Info Card */}
        <div className="contact-info-card">
          <div>
            <h3 className="contact-card-title">
              Contact Information
            </h3>
            <p className="contact-card-desc">
              I'm always open to discussing new opportunities, creative collaborations, or challenging development roles.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-row">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <div className="contact-detail-text">
                  <div className="contact-detail-label">Email Address</div>
                  <a href="mailto:ritiksuthar.dev@gmail.com" className="contact-detail-val">
                    ritiksuthar.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="contact-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="contact-detail-text">
                  <div className="contact-detail-label">Location</div>
                  <div className="contact-detail-val">
                    India (Available Worldwide Remote)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-social-footer">
            <div className="contact-social-heading">
              Connect with me
            </div>
            <div className="contact-social-links">
              <a href="https://github.com/ritiksuthar" target="_blank" rel="noreferrer" className="social-btn" title="GitHub" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href="https://linkedin.com/in/ritiksuthar" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a href="https://instagram.com/ritiksuthar" target="_blank" rel="noreferrer" className="social-btn" title="Instagram" aria-label="Instagram">
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card">
          <h3 className="contact-card-title">
            Send Me a Message
          </h3>

          {submitted && (
            <div className="contact-success-alert">
              <CheckCircle2 size={18} /> Thank you! Your message has been delivered directly to Ritik.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Smith"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <input
                type="text"
                placeholder="Project inquiry / Opportunity"
                className="form-input"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project, timeline, or idea..."
                className="form-textarea"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary contact-submit-btn"
            >
              {submitting ? 'Sending Message...' : (
                <><span>Send Message</span> <Send size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
