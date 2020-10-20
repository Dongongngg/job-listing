const monogoos = require("mongoose");

const JobSchema = new monogoos.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "please add a title"],
  },
  level: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  location: {
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
});

module.exports = monogoos.model("Jobs", JobSchema);
