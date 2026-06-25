const express = require('express');
const router = express.Router();
const announcements = require('../services/announcements');

// public announcements
router.get('/', async (req, res) => {
  try {
    const list = await announcements.listAnnouncements();
    res.json(list);
  } catch (err) { res.status(500).send('Server error'); }
});

module.exports = router;
