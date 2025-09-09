import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.js';
import multer from "multer"

const router = express.Router()
const storage = multer.memoryStorage();

//@api/v1/user/endpoint
router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated,multer({ storage }).single("logo"),updateCompany);

export default router;