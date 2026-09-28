const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbStore = require('../services/dbStore');
const authMiddleware = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const admin = await dbStore.findAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Only the portfolio owner can access this section.'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Access denied.'
      });
    }

    const token = jwt.sign(
      { id: admin.id || admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET || 'ritik_suthar_portfolio_secret_jwt_key_2026_super_secure',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Welcome back, Ritik!',
      token,
      user: {
        username: admin.username,
        role: 'admin'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// POST /api/auth/change-password
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Both current password and new password are required'
      });
    }

    const admin = await dbStore.findAdminByUsername(req.user.username);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await dbStore.updateAdminPassword(req.user.username, hashed);

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to change password' });
  }
});

module.exports = router;
