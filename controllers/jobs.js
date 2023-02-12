const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");
const { BadRequestError } = require("../errors");

const getAllJobs = async (req, resp) => {
  const allJobs = await Job.find({ createdBy: req.user.userId });
  resp.status(StatusCodes.OK).json({
    jobs: allJobs,
    count: allJobs.length,
  });
};

const getJob = async (req, resp) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  resp.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, resp) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  console.log("createJob");
  resp.status(StatusCodes.CREATED).json(job);
};

const deleteJobs = async (req, resp) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  resp.status(StatusCodes.OK).json();
};

const updateJobs = async (req, resp) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;
  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position field can not be empty");
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }
  resp.status(StatusCodes.OK).json({ job });
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJobs,
  updateJobs,
};
