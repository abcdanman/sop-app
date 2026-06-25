const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const applications = require('../services/applications');

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.random().toString(36).slice(2) + ext);
  }
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true); else cb(new Error('Only PDFs allowed'));
}});

// Create application
router.post('/', auth, upload.array('documents', 5), async (req, res) => {
  try {
    const { programTitle } = req.body;
    const docPaths = req.files?.map(f => f.path) || [];
  const app = await applications.createApplication({ student: req.user.id, programTitle, documents: docPaths, status: 'pending' });
  res.json(app);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get my applications
router.get('/me', auth, async (req, res) => {
  try {
  const apps = await applications.listByStudent(req.user.id);
  res.json(apps);
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
