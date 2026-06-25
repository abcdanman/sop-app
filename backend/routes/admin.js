const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const users = require('../services/users');
const applications = require('../services/applications');
const announcements = require('../services/announcements');

// list all students
router.get('/students', auth, roles(['admin']), async (req, res) => {
  const students = await users.listStudents();
  res.json(students);
});

// applications list + filter
router.get('/applications', auth, roles(['admin']), async (req, res) => {
  const { status, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (q) filter.q = q;
  const apps = await applications.listAll(filter);
  res.json(apps);
});

// update application status
router.put('/applications/:id', auth, roles(['admin']), async (req, res) => {
  const { status } = req.body;
  if (!['pending','approved','rejected'].includes(status)) return res.status(400).json({ msg: 'Invalid status' });
  const app = await applications.updateStatus(req.params.id, status);
  res.json(app);
});

// announcements CRUD
router.post('/announcements', auth, roles(['admin']), async (req, res) => {
  const { title, content } = req.body;
  const a = await announcements.createAnnouncement({ title, content });
  res.json(a);
});

router.put('/announcements/:id', auth, roles(['admin']), async (req, res) => {
  const { title, content } = req.body;
  const a = await announcements.updateAnnouncement(req.params.id, { title, content });
  res.json(a);
});

router.delete('/announcements/:id', auth, roles(['admin']), async (req, res) => {
  await announcements.deleteAnnouncement(req.params.id);
  res.json({ ok: true });
});

// stats
router.get('/stats', auth, roles(['admin']), async (req, res) => {
  const s = await applications.stats();
  res.json(s);
});

module.exports = router;
