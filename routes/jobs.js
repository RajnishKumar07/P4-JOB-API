const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  createJob,
  updateJobs,
  deleteJobs,
} = require("../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJobs).delete(deleteJobs);

module.exports = router;
