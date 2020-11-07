const Jobs = require("../models/jobs");

// @desc    get all jobs for current login user
// @route   GET /api/jobs
// @access  private
exports.getJobs = async (req, res, next) => {
  try {
    const jobs = await Jobs.find({
      user: req.loginUser._id,
    });
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
// @desc    add jobs for current login user
// @route   POST /api/jobs
// @access  private
exports.addJobs = async (req, res, next) => {
  try {
    const job = await Jobs.create({
      title: req.body.jobTitle,
      company: req.body.companyName,
      source: req.body.source,
      level: req.body.jobLevel,
      state: req.body.state,
      appliedDate: req.body.appliedDate,
      user: req.loginUser._id,
    });

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    //  if no title
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);

      res.status(422).json({
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
// @desc    delete jobs
// @route   DELETE /api/jobs/:id
// @access  private
exports.deleteJobs = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id);

    if (!job) {
      return res.status(401).json({
        success: false,
        error: "No job found",
      });
    }
    await job.remove();
    return res.status(200).json({
      success: true,
      data: "Job removed",
    });
  } catch (err) {
    return res.send(500).json({
      success: false,
      error: err.message,
    });
  }
};
// @desc    update by job's id
// @route   PUT /api/jobs/:id
// @access  private
exports.updateJobs = async (req, res, next) => {
  try {
    const job = await Jobs.findById(req.params.id);
    if (!job) {
      return res.status(401).json({
        success: false,
        error: "No job found",
      });
    }
    await job.updateOne({
      title: req.body.jobTitle,
      level: req.body.jobLevel,
      company: req.body.companyName,
      source: req.body.source,
      appliedDate: req.body.appliedDate,
      state: req.body.state,
    });
    return res.status(200).json({
      success: true,
      data: "Job updated",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
