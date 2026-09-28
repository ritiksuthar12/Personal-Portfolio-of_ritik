import React from 'react';
import { ArrowUp, Lock, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenAdmin, isAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff', padding: '3rem 2rem 2rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.05em', color: '#111827' }}>
                RS
              </span>
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>
                | Ritik Suthar Portfolio
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginTop: '0.35rem' }}>
              Full Stack Developer • MERN Stack • C++ • DSA
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={onOpenAdmin}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                color: isAdmin ? '#059669' : '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {isAdmin ? <ShieldCheck size={14} /> : <Lock size={14} />}
              {isAdmin ? 'Admin Authenticated' : 'Admin Login'}
            </button>

            <button
              onClick={scrollToTop}
              className="social-btn"
              style={{ width: '38px', height: '38px' }}
              title="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#9ca3af', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            © {new Date().getFullYear()} Ritik Suthar. All rights reserved.
          </div>
          <div>
            Built with React.js, Node.js, Express & MongoDB.
          </div>
        </div>
      </div>
    </footer>
  );
}
