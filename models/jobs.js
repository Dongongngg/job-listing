const monogoos = require('mongoose');

const JobSchema = new monogoos.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'please add a title'],
  },
  level: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
  },
  source: {
    type: String,
  },
  appliedDate: {
    type: Date,
  },
  state: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = monogoos.model('Jobs', JobSchema);
