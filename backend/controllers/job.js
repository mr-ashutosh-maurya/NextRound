import Job from "../models/job.js";

// -------------------- POST a new Job --------------------
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirement,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id; // comes from isAuthenticated middleware

    // 1. Validate required fields
    if (
      !title ||
      !description ||
      !requirement ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 2. Create job
    const job = await Job.create({
      title,
      description,
      requirement: requirement.split(","), // convert CSV string → array
      salary,
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      createdBy: userId,
    });

    // 3. Success response
    return res.status(201).json({
      message: "Job registered successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// -------------------- GET all Jobs (with search) --------------------
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    // 1. Build query for case-insensitive search
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "Jobs not found.", success: false });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// -------------------- GET Job by ID --------------------
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicant", select: "_id fullName email" },
    });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    // Track when user views a job
    const userId = req.id;
    const user = await User.findById(userId);
    if (user && user.role === "student") {
      user.recentlyViewed = user.recentlyViewed.filter(
        (id) => id.toString() !== jobId
      );
      user.recentlyViewed.unshift(jobId);

      if (user.recentlyViewed.length > 5) {
        user.recentlyViewed.pop();
      }

      await user.save();
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// -------------------- GET all Jobs created by Admin (Recruiter) --------------------
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // comes from auth middleware
    const jobs = await Job.find({ createdBy: adminId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "Jobs not found.", success: false });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

import User from "../models/user.js";
import axios from "axios";

// -------------------- GET Recommended Jobs --------------------
export const getRecommendedJobs = async (req, res) => {
  try {
    const userId = req.id; // from auth middleware
    const user = await User.findById(userId);

    if (!user || user.role !== "student") {
      return res
        .status(403)
        .json({
          message: "Only students can get recommendations",
          success: false,
        });
    }

    const studentSkills = user.profile.skills;
    if (!studentSkills || studentSkills.length === 0) {
      return res
        .status(400)
        .json({
          message: "Please add skills in your profile for recommendations",
          success: false,
        });
    }

    // Get all jobs from MongoDB
    // Get all jobs with full details + company populated
    const jobs = await Job.find()
      .populate("company", "name logo") // only fetch company name & logo
      .select(
        "_id title description requirement salary location jobType position createdAt"
      );

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs available", success: false });
    }

    // Prepare payload for Python ML service
    const payload = {
      skills: studentSkills,
      jobs: jobs.map((job) => ({
        id: job._id.toString(),
        requirement: job.requirement,
      })),
    };

    // Call Python FastAPI service
    const response = await axios.post(
      "https://nextround-python.onrender.com/recommend",
      payload
    );

    // Match recommended IDs back with job details
    let recommendedJobs = response.data.recommendations.map((rec) => {
      const job = jobs.find((j) => j._id.toString() === rec.id);
      return { ...job.toObject(), score: rec.score };
    });

    // ✅ Sort by score (highest first)
    recommendedJobs = recommendedJobs.sort((a, b) => b.score - a.score);

    return res.status(200).json({
      success: true,
      recommendations: recommendedJobs.slice(0, 5), // get only two job recommandation
    });
  } catch (error) {
    console.error("Recommendation error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Get recently viewed jobs
export const getRecentlyViewedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("recentlyViewed");
    return res.status(200).json({
      success: true,
      jobs: user.recentlyViewed,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSimilarToViewedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.id).populate("recentlyViewed");
    if (!user || user.recentlyViewed.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No recently viewed jobs found" });
    }

    // Take the most recent job
    const lastViewed = user.recentlyViewed[0];

    // Fetch all jobs
    const jobs = await Job.find()
      .populate("company", "name logo") // only fetch company name & logo
      .select(
        "_id title logo description requirement salary location jobType position createdAt"
      );

    // Prepare payload for Python
    const payload = {
      skills: lastViewed.requirement, // use job requirement as "skills"
      jobs: jobs.map((job) => ({
        id: job._id.toString(),
        requirement: job.requirement,
      })),
    };

    const response = await axios.post(
      "https://nextround-python.onrender.com/recommend",
      payload
    );

    // Map recommendations to job details
    const similarJobs = response.data.recommendations.map((rec) => {
      const job = jobs.find((j) => j._id.toString() === rec.id);
      return { ...job.toObject(), score: rec.score };
    });

    return res.status(200).json({
      success: true,
      similar: similarJobs,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
