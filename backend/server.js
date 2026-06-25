const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

// Supabase client available via config/supabase.js (no DB connect step required)
require('./config/supabase');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => res.send({ ok: true, msg: 'SOP API running' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
