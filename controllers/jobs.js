const Jobs = require("../models/jobs");

// @desc    get all jobs
// @route   GET /api/jobs
// @access  public
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Jobs.find();
    return res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: err.message,
    });
  }
};
// @desc    add jobs
// @route   POST /api/jobs
// @access  public
exports.addJobs = async (req, res, next) => {
  try {
    const job = await Jobs.create(req.body);

    return res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};
// @desc    delete all jobs
// @route   DELETE /api/jobs/:id
// @access  public
exports.deleteJobs = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: "No job found",
      });
    }
    await job.remove();
    return res.status(200).json({
      success: true,
      data: "job removed",
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: err.message,
    });
  }
};
// @desc    update all jobs
// @route   PUT /api/jobs/:id
// @access  public
exports.updateJobs = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        error: "No job found",
      });
    }
    await job.updateOne({ title: req.body.title, level: req.body.level });
    return res.status(200).json({
      success: true,
      data: "job updated",
    });
  } catch (err) {}
};