const express = require("express");
const router = express.Router();
const {
  getJobs,
  addJobs,
  updateJobs,
  deleteJobs,
} = require("../controllers/jobs");

router.route("/").get(getJobs).post(addJobs);

router.route("/:id").put(updateJobs).delete(deleteJobs);

module.exports = router;
