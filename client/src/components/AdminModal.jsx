import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Key,
  FolderGit2,
  Cpu,
  Mail,
  Trash2,
  Edit,
  Plus,
  ExternalLink,
  ShieldCheck,
  Database,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminModal({
  isOpen,
  onClose,
  isAdmin,
  onLoginSuccess,
  onLogout,
  projects = [],
  skills = [],
  onOpenAddProject,
  onEditProject,
  onDeleteProject,
  onOpenAddSkill,
  onEditSkill,
  onDeleteSkill,
  notify
}) {
  const [activeTab, setActiveTab] = useState('projects');
  const [username, setUsername] = useState('ritik');
  const [password, setPassword] = useState('admin123');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Messages state
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Change password state
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isAdmin && activeTab === 'messages') {
      loadMessages();
    }
  }, [isAdmin, activeTab]);

  const loadMessages = async () => {
    setMessagesLoading(true);
    try {
      const data = await api.getMessages();
      setMessages(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.deleteMessage(id);
      setMessages(messages.filter(m => (m.id || m._id) !== id));
      notify('Message deleted', 'success');
    } catch (err) {
      notify('Failed to delete message', 'error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await api.login({ username, password });
      onLoginSuccess(res.user);
      notify('Welcome back, Ritik! Admin access granted.', 'success');
    } catch (err) {
      setLoginError(err.message || 'Login failed. Only Ritik can access this.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ritik_portfolio_token')}`
        },
        body: JSON.stringify({ currentPassword: currPass, newPassword: newPass })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');
      setPassMsg({ text: 'Password updated successfully!', type: 'success' });
      setCurrPass('');
      setNewPass('');
      notify('Password updated!', 'success');
    } catch (err) {
      setPassMsg({ text: err.message, type: 'error' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: isAdmin ? '850px' : '450px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#111827',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isAdmin ? <ShieldCheck size={20} /> : <Lock size={18} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>
                {isAdmin ? 'Ritik\'s Admin Control Panel' : 'Private Admin Access'}
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                {isAdmin
                  ? 'Manage your dynamic projects, skills, and client inquiries'
                  : 'Only Ritik Suthar can add, edit, or delete items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {!isAdmin ? (
          /* Login Form */
          <form onSubmit={handleLogin}>
            <div className="modal-body">
              {loginError && (
                <div style={{ padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  {loginError}
                </div>
              )}

              <div style={{ backgroundColor: '#f9fafb', border: '1px solid var(--border-light)', borderRadius: '0.75rem', padding: '0.85rem', marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: '1.5' }}>
                  <strong>🔒 Protected Portfolio Section:</strong><br />
                  Projects & Skills can only be modified with admin credentials.
                </p>
                <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  Default login: Username: <code>ritik</code> | Password: <code>admin123</code>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Admin Username</label>
                <input
                  type="text"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ritik"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Admin Password</label>
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={onClose}
                className="btn-outline"
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loginLoading}
                className="btn-primary"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}
              >
                {loginLoading ? 'Verifying...' : 'Authenticate & Enter'}
              </button>
            </div>
          </form>
        ) : (
          /* Authenticated Admin Dashboard */
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', padding: '0 1.5rem', gap: '1.5rem', backgroundColor: '#fafafa' }}>
              <button
                onClick={() => setActiveTab('projects')}
                style={{
                  padding: '0.85rem 0',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === 'projects' ? '2px solid #111827' : '2px solid transparent',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  color: activeTab === 'projects' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <FolderGit2 size={16} /> Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                style={{
                  padding: '0.85rem 0',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === 'skills' ? '2px solid #111827' : '2px solid transparent',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  color: activeTab === 'skills' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Cpu size={16} /> Skills ({skills.length})
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                style={{
                  padding: '0.85rem 0',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === 'messages' ? '2px solid #111827' : '2px solid transparent',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  color: activeTab === 'messages' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Mail size={16} /> Inbox
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                style={{
                  padding: '0.85rem 0',
                  border: 'none',
                  background: 'none',
                  borderBottom: activeTab === 'settings' ? '2px solid #111827' : '2px solid transparent',
                  fontWeight: '600',
                  fontSize: '0.88rem',
                  color: activeTab === 'settings' ? '#111827' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Key size={16} /> Security
              </button>
            </div>

            <div className="modal-body" style={{ minHeight: '350px' }}>
              {/* TAB 1: Projects */}
              {activeTab === 'projects' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      Add, update, or remove projects. Changes immediately reflect in real time.
                    </p>
                    <button
                      onClick={onOpenAddProject}
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Plus size={14} /> Add Project
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {projects.map((proj) => {
                      const id = proj.id || proj._id;
                      return (
                        <div
                          key={id}
                          style={{
                            border: '1px solid var(--border-light)',
                            borderRadius: '0.75rem',
                            padding: '0.85rem 1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#ffffff'
                          }}
                        >
                          <div style={{ maxWidth: '65%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827' }}>
                                {proj.title}
                              </h4>
                              {proj.featured && (
                                <span style={{ fontSize: '0.65rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                  FEATURED
                                </span>
                              )}
                              <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>• {proj.category}</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                              {proj.description}
                            </p>
                            <a
                              href={proj.deployedUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ fontSize: '0.75rem', color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '3px', textDecoration: 'none', marginTop: '2px' }}
                            >
                              {proj.deployedUrl} <ExternalLink size={11} />
                            </a>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                              onClick={() => onEditProject(proj)}
                              className="action-btn-sm edit"
                              style={{ padding: '0.35rem 0.65rem' }}
                            >
                              <Edit size={13} /> Edit
                            </button>
                            <button
                              onClick={() => onDeleteProject(id, proj.title)}
                              className="action-btn-sm delete"
                              style={{ padding: '0.35rem 0.65rem' }}
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: Skills */}
              {activeTab === 'skills' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                      Add or adjust skills, icons, and proficiency levels.
                    </p>
                    <button
                      onClick={onOpenAddSkill}
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                    >
                      <Plus size={14} /> Add Skill
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {skills.map((skill) => {
                      const id = skill.id || skill._id;
                      return (
                        <div
                          key={id}
                          style={{
                            border: '1px solid var(--border-light)',
                            borderRadius: '0.75rem',
                            padding: '0.75rem 1rem',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>
                              {skill.name}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                              {skill.category} • {skill.proficiency || 85}%
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <button
                              onClick={() => onEditSkill(skill)}
                              className="action-btn-sm edit"
                              style={{ padding: '0.3rem 0.5rem' }}
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => onDeleteSkill(id, skill.name)}
                              className="action-btn-sm delete"
                              style={{ padding: '0.3rem 0.5rem' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Messages */}
              {activeTab === 'messages' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Inquiries Received</h3>
                    <button onClick={loadMessages} className="btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                      Refresh
                    </button>
                  </div>

                  {messagesLoading ? (
                    <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>Loading messages...</p>
                  ) : messages.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                      No messages received yet. Messages sent via the Contact form will appear here.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {messages.map((m) => {
                        const id = m.id || m._id;
                        return (
                          <div
                            key={id}
                            style={{
                              border: '1px solid var(--border-light)',
                              borderRadius: '0.75rem',
                              padding: '1rem',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                              <div>
                                <span style={{ fontWeight: '700', fontSize: '0.92rem', color: '#111827' }}>{m.name}</span>
                                <span style={{ fontSize: '0.8rem', color: '#6b7280', marginLeft: '0.5rem' }}>&lt;{m.email}&gt;</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                  {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : ''}
                                </span>
                                <button
                                  onClick={() => handleDeleteMessage(id)}
                                  className="action-btn-sm delete"
                                  style={{ padding: '0.25rem 0.45rem' }}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                              {m.subject || 'Portfolio Message'}
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5' }}>
                              {m.message}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Settings & Security */}
              {activeTab === 'settings' && (
                <div style={{ maxWidth: '480px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Change Admin Password</h3>
                  <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '1.25rem' }}>
                    Keep your portfolio protected by updating your secret password.
                  </p>

                  {passMsg.text && (
                    <div style={{ padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', backgroundColor: passMsg.type === 'success' ? '#d1fae5' : '#fee2e2', color: passMsg.type === 'success' ? '#065f46' : '#991b1b' }}>
                      {passMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label className="form-label">Current Password</label>
                      <input
                        type="password"
                        className="form-input"
                        value={currPass}
                        onChange={(e) => setCurrPass(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-input"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
                      Update Password
                    </button>
                  </form>

                  <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '0.75rem', backgroundColor: '#f9fafb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <Database size={16} color="#059669" />
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>Storage Engine Status</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: '1.4' }}>
                      Running on dual-engine: Mongoose / MongoDB with resilient persistent store fallback. Real-time updates persist across all sessions!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                Logged in as <strong>Ritik Suthar</strong>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onLogout}
                  className="btn-outline"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.82rem', color: '#dc2626', borderColor: '#fca5a5' }}
                >
                  Logout Admin
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-primary"
                  style={{ padding: '0.5rem 1.2rem', fontSize: '0.82rem' }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
