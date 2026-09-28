import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsRibbon from './components/StatsRibbon';
import FeaturedProjects from './components/FeaturedProjects';
import TechStack from './components/TechStack';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectsModal from './components/ProjectsModal';
import SkillsModal from './components/SkillsModal';
import AdminModal from './components/AdminModal';
import ProjectEditorModal from './components/ProjectEditorModal';
import SkillEditorModal from './components/SkillEditorModal';
import Toast from './components/Toast';
import { api } from './services/api';
import { ShieldCheck, Plus, LogOut, ExternalLink, Sparkles } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication State
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Modals
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [projectEditorOpen, setProjectEditorOpen] = useState(false);
  const [skillEditorOpen, setSkillEditorOpen] = useState(false);

  // Editing Items
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const notify = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load initial data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [projData, skillData] = await Promise.all([
        api.getProjects(),
        api.getSkills()
      ]);
      setProjects(projData || []);
      setSkills(skillData || []);
    } catch (err) {
      console.error('Failed to load portfolio data:', err);
      notify('Backend connected with fallback offline storage', 'info');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    loadData();

    // Check if admin is logged in
    const checkUser = async () => {
      const user = await api.checkAuth();
      if (user) {
        setIsAdmin(true);
        setCurrentUser(user);
      }
    };
    checkUser();
  }, [loadData]);

  // Project Handlers
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectEditorOpen(true);
  };

  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectEditorOpen(true);
  };

  const handleSaveProject = async (projectData) => {
    if (editingProject) {
      const id = editingProject.id || editingProject._id;
      const updated = await api.updateProject(id, projectData);
      setProjects((prev) =>
        prev.map((p) => ((p.id || p._id) === id ? updated : p))
      );
      notify(`Project "${updated.title}" updated successfully!`, 'success');
    } else {
      const created = await api.createProject(projectData);
      setProjects((prev) => [created, ...prev]);
      notify(`Project "${created.title}" added to your portfolio!`, 'success');
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => (p.id || p._id) !== id));
      notify(`Project "${title}" deleted successfully`, 'success');
    } catch (err) {
      notify(err.message || 'Failed to delete project', 'error');
    }
  };

  // Skill Handlers
  const handleOpenAddSkill = () => {
    setEditingSkill(null);
    setSkillEditorOpen(true);
  };

  const handleOpenEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillEditorOpen(true);
  };

  const handleSaveSkill = async (skillData) => {
    if (editingSkill) {
      const id = editingSkill.id || editingSkill._id;
      const updated = await api.updateSkill(id, skillData);
      setSkills((prev) =>
        prev.map((s) => ((s.id || s._id) === id ? updated : s))
      );
      notify(`Skill "${updated.name}" updated!`, 'success');
    } else {
      const created = await api.createSkill(skillData);
      setSkills((prev) => [...prev, created]);
      notify(`Skill "${created.name}" added to Tech Stack!`, 'success');
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from skills?`)) {
      return;
    }
    try {
      await api.deleteSkill(id);
      setSkills((prev) => prev.filter((s) => (s.id || s._id) !== id));
      notify(`Skill "${name}" removed`, 'success');
    } catch (err) {
      notify(err.message || 'Failed to delete skill', 'error');
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user) => {
    setIsAdmin(true);
    setCurrentUser(user);
    setAdminModalOpen(false);
  };

  const handleLogout = () => {
    api.logout();
    setIsAdmin(false);
    setCurrentUser(null);
    setAdminModalOpen(false);
    notify('Logged out from Admin portal', 'info');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Notice Bar if logged in */}
      {isAdmin && (
        <aside aria-label="Admin Control Bar" className="admin-bar-ribbon">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldCheck size={16} color="#34d399" />
            <span>
              <strong>Admin Mode Active:</strong> Logged in as <strong>{currentUser?.username || 'Ritik'}</strong>. You have exclusive rights to add, edit, and delete projects & skills.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={handleOpenAddProject}
              className="action-btn-sm"
              style={{ backgroundColor: '#27272a', color: '#fff', borderColor: '#3f3f46' }}
            >
              <Plus size={13} /> Project
            </button>
            <button
              onClick={handleOpenAddSkill}
              className="action-btn-sm"
              style={{ backgroundColor: '#27272a', color: '#fff', borderColor: '#3f3f46' }}
            >
              <Plus size={13} /> Skill
            </button>
            <button
              onClick={() => setAdminModalOpen(true)}
              className="action-btn-sm"
              style={{ backgroundColor: '#2563eb', color: '#fff', borderColor: '#2563eb' }}
            >
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="action-btn-sm"
              style={{ backgroundColor: '#dc2626', color: '#fff', borderColor: '#dc2626' }}
              title="Logout Admin"
            >
              <LogOut size={13} />
            </button>
          </div>
        </aside>
      )}

      {/* Main Navbar */}
      <Navbar
        onOpenAdmin={() => setAdminModalOpen(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onOpenAddProject={handleOpenAddProject}
        onOpenAddSkill={handleOpenAddSkill}
      />

      <main style={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Hero onExploreProjects={() => setProjectsModalOpen(true)} />

        {/* Stats Ribbon */}
        <StatsRibbon projectsCount={projects.length} />

        {/* Two-Column Section: Featured Projects + Tech Stack (matches screenshot layout) */}
        <section id="projects" className="featured-tech-grid">
          {/* Column 1: Featured Projects */}
          <FeaturedProjects
            projects={projects}
            isAdmin={isAdmin}
            onViewAll={() => setProjectsModalOpen(true)}
            onEditProject={handleOpenEditProject}
            onDeleteProject={handleDeleteProject}
            onAddProject={handleOpenAddProject}
          />

          {/* Column 2: Tech Stack */}
          <div id="skills">
            <TechStack
              skills={skills}
              isAdmin={isAdmin}
              onViewAll={() => setSkillsModalOpen(true)}
              onAddSkill={handleOpenAddSkill}
              onEditSkill={handleOpenEditSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          </div>
        </section>

        {/* About Me Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection notify={notify} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} isAdmin={isAdmin} />

      {/* MODALS */}
      <ProjectsModal
        isOpen={projectsModalOpen}
        onClose={() => setProjectsModalOpen(false)}
        projects={projects}
        isAdmin={isAdmin}
        onAddProject={handleOpenAddProject}
        onEditProject={handleOpenEditProject}
        onDeleteProject={handleDeleteProject}
      />

      <SkillsModal
        isOpen={skillsModalOpen}
        onClose={() => setSkillsModalOpen(false)}
        skills={skills}
        isAdmin={isAdmin}
        onAddSkill={handleOpenAddSkill}
        onEditSkill={handleOpenEditSkill}
        onDeleteSkill={handleDeleteSkill}
      />

      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        projects={projects}
        skills={skills}
        onOpenAddProject={handleOpenAddProject}
        onEditProject={handleOpenEditProject}
        onDeleteProject={handleDeleteProject}
        onOpenAddSkill={handleOpenAddSkill}
        onEditSkill={handleOpenEditSkill}
        onDeleteSkill={handleDeleteSkill}
        notify={notify}
      />

      <ProjectEditorModal
        isOpen={projectEditorOpen}
        onClose={() => setProjectEditorOpen(false)}
        project={editingProject}
        onSave={handleSaveProject}
      />

      <SkillEditorModal
        isOpen={skillEditorOpen}
        onClose={() => setSkillEditorOpen(false)}
        skill={editingSkill}
        onSave={handleSaveSkill}
      />

      {/* Floating Toast Notification Stack */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
