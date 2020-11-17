const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config({ path: './config/config.env' });

//  MongoDB connection
connectDB();

const jobs = require('./routes/jobs');
const users = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

//  routes
app.use('/api/jobs', jobs);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;
const MODE = process.env.NODE_ENV;

app.listen(
  PORT,
  console.log(`server is running on ${MODE} mode, and is listening on port ${PORT}`),
);

//  production static url
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
