// @desc    get all jobs
// @route   GET /api/jobs
// @access  public
exports.getJobs = (req, res, next) => {
  res.send("GET jobs");
};
// @desc    add jobs
// @route   POST /api/jobs
// @access  public
exports.addJobs = (req, res, next) => {
  res.send("POST jobs");
};
// @desc    delete all jobs
// @route   DELETE /api/jobs/:id
// @access  public
exports.deleteJobs = (req, res, next) => {
  res.send("DELETE jobs");
};
// @desc    update all jobs
// @route   PUT /api/jobs/:id
// @access  public
exports.updateJobs = (req, res, next) => {
  res.send("PUT jobs");
};
