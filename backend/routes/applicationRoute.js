import express from "express";
import { applyJob, getAppliedJobs, getApplicants, updateApplicationStatus } from "../controllers/application.js";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/apply/:jobId", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:jobId/applicants", isAuthenticated, getApplicants);
router.post("/status/:applicationId/update", isAuthenticated, updateApplicationStatus

); // 👈 update status

// //@api/v1/job/endpoint
// router.route("/post").post(isAuthenticated,postJob);
// router.route("/get").get(isAuthenticated,getAllJobs);
// router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
// router.route("/get/:id").get(isAuthenticated,getJobById);

export default router;
