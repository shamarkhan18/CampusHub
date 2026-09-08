require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const AuthRoutes = require('./routes/AuthRoutes');
const OpportunityRoutes = require('./routes/OpportunityRoutes');
const ApplicationRoutes = require('./routes/ApplicationRoutes');
const UserRoutes = require('./routes/UserRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'campushub-backend' });
});

app.use('/api/auth', AuthRoutes);
app.use('/api/opportunities', OpportunityRoutes);
app.use('/api/applications', ApplicationRoutes);
app.use('/api/users', UserRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`CampusHub API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });