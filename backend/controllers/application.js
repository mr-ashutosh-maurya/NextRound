import Application from "../models/application.js";
import Job from "../models/job.js";

// @desc   Apply for a job
// @route  POST /api/applications/apply/:jobId
// @access Protected
export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // ✅ set by isAuthenticated middleware
    const jobId = req.params.jobId;

    // 1. check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    // 2. check if already applied
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You already applied for this job.", success: false });
    }

    // 3. create new application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // 4. push application ref into job
    job.applications.push(application._id);
    await job.save();

    // 5. fetch updated job with populated applications & company
    const updatedJob = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: { path: "applicant", select: "_id fullName email" },
      })
      .populate("company");

    return res.status(201).json({
      message: "Job applied successfully.",
      job: updatedJob,   // ✅ populated job returned
      success: true,
    });
  } catch (error) {
    console.error("Error in applyJob:", error.message);
    return res.status(500).json({ message: "Server error", success: false });
  }
};


// @desc   Get all jobs applied by a user
// @route  GET /api/applications/my
// @access Protected
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select: "name location", // ✅ only return relevant company fields
        },
      })
      .sort({ createdAt: -1 });

    if (!applications) {
      return res
        .status(400)
        .json({ message: "No application found.", success: false });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAppliedJobs:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc   Get all applicants for a specific job (only job owner can access)
// @route  GET /api/applications/:jobId/applicants
// @access Protected (Recruiter/Admin)
export const getApplicants = async (req, res) => {
  try {
    const userId = req.id; // ✅ recruiter ID from isAuthenticated
    const { jobId } = req.params;

    // 1. find job
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found.", success: false });
    }

    // 2. ensure that logged-in user is the job creator (recruiter)
    if (job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to view applicants for this job.",
        success: false,
      });
    }

    // 3. fetch applications with applicant details
    const applicants = await Application.find({ job: jobId })
      .populate(
        "applicant",
        "fullname email phoneNumber profile.skills profile.resume profile.profilePhoto"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobTitle: job.title,
      applicantsCount: applicants.length,
      applicants,
      success: true,
    });
  } catch (error) {
    console.error("Error in getApplicants:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// @desc   Update application status (accept/reject/pending)
// @route  PUT /api/applications/:applicationId/status
// @access Protected (Recruiter/Admin)
export const updateApplicationStatus = async (req, res) => {
  try {
    const userId = req.id; // recruiter id (from isAuthenticated middleware)
    const { applicationId } = req.params;
    const { status } = req.body;

    // 1. Validate status
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value", success: false });
    }

    // 2. Find application
    const application = await Application.findById(applicationId).populate(
      "job"
    );
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }

    // 3. Ensure only job creator can update
    if (application.job.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this application",
        success: false,
      });
    }

    // 4. Update status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Application status updated successfully",
      application,
      success: true,
    });
  } catch (error) {
    console.error("Error in updateApplicationStatus:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
