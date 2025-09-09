import Company from "../models/company.js";
import DataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ---------------------- REGISTER COMPANY ----------------------
export const registerCompany = async (req, res) => {
  try {
    // 1. Extract companyName from request body
    const { companyName } = req.body;

    // 2. Validate input
    if (!companyName) {
      return res.status(400).json({ message: "company name is required." });
    }

    // 3. Check if company already exists in DB
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "company name already exists." });
    }

    // 4. Create new company in DB
    company = await Company.create({
      name: companyName,
      userId: req.id, // assuming req.id is set by auth middleware
    });

    // 5. Send success response
    return res.status(201).json({
      message: "company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// ---------------------- GET ALL COMPANIES FOR A USER ----------------------
export const getCompany = async (req, res) => {
  try {
    // 1. Extract userId from request (set via middleware)
    const userId = req.id;

    // 2. Find all companies created by the user
    const companies = await Company.find({ userId });

    // 3. If no companies found, return 404
    if (companies.length === 0) {
      return res.status(404).json({ message: "no companies found." });
    }

    // 4. Send success response
    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// ---------------------- GET COMPANY BY ID ----------------------
export const getCompanyById = async (req, res) => {
  try {
    // 1. Extract companyId from request params
    const companyId = req.params.id;

    // 2. Find company by ID
    const company = await Company.findById(companyId);

    // 3. If not found, return 404
    if (!company) {
      return res.status(404).json({ message: "company not found." });
    }

    // 4. Send success response
    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// ---------------------- UPDATE COMPANY ----------------------
export const updateCompany = async (req, res) => {
  try {
    // 1. Extract fields from request body
    const { name, description, website, location } = req.body;

    // 2. Extract file if uploaded (e.g., logo)
    let logo;

    // ✅ Only process logo if file is uploaded
    if (req.file) {
      const file = req.file;
      const fileUri = DataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    // Build update object dynamically
    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    // 4. Find company by ID and update with new data
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    // 5. If company not found, return 404
    if (!company) {
      return res.status(404).json({ message: "company not found." });
    }

    // 6. Send success response
    return res.status(200).json({
      message: "company information updated.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
