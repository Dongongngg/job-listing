const express = require("express");
const router = express.Router();
const {
  getJobs,
  addJobs,
  updateJobs,
  deleteJobs,
} = require("../controllers/jobs");

const { auth } = require("../middlewares/verifyToken");

router.route("/").get([auth], getJobs).post([auth], addJobs);

router.route("/:id").put([auth], updateJobs).delete([auth], deleteJobs);

module.exports = router;
