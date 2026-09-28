const API_BASE = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('ritik_portfolio_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Projects
  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data.data;
  },

  async createProject(projectData) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create project');
    return data.data;
  },

  async updateProject(id, projectData) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(projectData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update project');
    return data.data;
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete project');
    return data;
  },

  // Skills
  async getSkills() {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    const data = await res.json();
    return data.data;
  },

  async createSkill(skillData) {
    const res = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create skill');
    return data.data;
  },

  async updateSkill(id, skillData) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(skillData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update skill');
    return data.data;
  },

  async deleteSkill(id) {
    const res = await fetch(`${API_BASE}/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete skill');
    return data;
  },

  // Contact
  async sendMessage(messageData) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  async getMessages() {
    const res = await fetch(`${API_BASE}/contact`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    const data = await res.json();
    return data.data;
  },

  async deleteMessage(id) {
    const res = await fetch(`${API_BASE}/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete message');
    return data;
  },

  // Auth
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    if (data.token) {
      localStorage.setItem('ritik_portfolio_token', data.token);
      localStorage.setItem('ritik_portfolio_user', JSON.stringify(data.user));
    }
    return data;
  },

  async checkAuth() {
    const token = localStorage.getItem('ritik_portfolio_token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        localStorage.removeItem('ritik_portfolio_token');
        localStorage.removeItem('ritik_portfolio_user');
        return null;
      }
      const data = await res.json();
      return data.user;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('ritik_portfolio_token');
    localStorage.removeItem('ritik_portfolio_user');
  }
};
