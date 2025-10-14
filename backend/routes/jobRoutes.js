import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, getRecentlyViewedJobs, getRecommendedJobs, getSimilarToViewedJobs, postJob } from '../controllers/job.js';

const router = express.Router()


//@api/v1/job/endpoint
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);

router.get("/recommendations", isAuthenticated, getRecommendedJobs);
router.get("/recently-viewed", isAuthenticated, getRecentlyViewedJobs);
router.get("/similar-viewed", isAuthenticated, getSimilarToViewedJobs);

export default router;