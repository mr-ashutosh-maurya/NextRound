import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import DataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
// ------------------------------------
// |          REGISTRATION            |
// ------------------------------------

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    // 1. Validate fields
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // 3. Hash password
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    const file = req.file;
    const fileUri = DataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // 4. Create user
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();

    // 5. Response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ------------------------------------
// |             LOGIN                |
// ------------------------------------

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1. Validate input
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // 2. Find user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Compare password and role
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "Account does not exist with current role." });
    }

    // 4. Generate JWT
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // 5. Response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none", // ✅ allow cross-site cookies
        secure: true, // ✅ required on Render (HTTPS)
      })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: {
            bio: user.profile.bio,
            skills: user.profile.skills,
            resume: user.profile.resume,
            resumeOriginalName: user.profile.resumeOriginalName,
            profilePhoto: user.profile.profilePhoto,
          },
        },
        success: true,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ------------------------------------
// |             LOGOUT               |
// ------------------------------------

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error(error);
  }
};

// ------------------------------------
// |            UPDATION              |
// ------------------------------------

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;

//     // Convert skills to array
//     let skillsArray;
//     if(skills) skillsArray = skills.split(",").map((skill) => skill.trim());

//     // User id from auth middleware
//     const userId = req.id;

//     let user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 2. Update fields
//     if(fullname) user.fullname = fullname;
//     if(email) user.email = email;
//     if(phoneNumber) user.phoneNumber = phoneNumber;
//     if(bio) user.bio = bio;
//     if(skills) user.skills = skillsArray;
//     user.skills = skillsArray;

//     await user.save();

//     // 3. Response
//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         bio: user.bio,
//         skills: user.skills,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Update basic fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = skills.split(",").map((s) => s.trim());
    }

    // ✅ Handle file upload (only if a file is uploaded)
    // if (req.file) {
    //   const fileUri = DataUri(req.file); // convert buffer to data URI
    //   const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
    //     folder: "resumes", // optional: Cloudinary folder
    //     resource_type: "raw",
    //   });

    //   user.profile.resume = cloudResponse.secure_url;
    //   user.profile.resumeOriginalName = req.file.originalname;
    // }
    if (req.file) {
      const fileUri = DataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "resumes",
        resource_type: "raw",
      });

      // Force inline instead of download
      const inlineUrl = cloudResponse.secure_url.replace(
        "/upload/",
        "/upload/fl_attachment:false/"
      );

      user.profile.resume = inlineUrl;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: {
          bio: user.profile.bio,
          skills: user.profile.skills,
          resume: user.profile.resume,
          resumeOriginalName: user.profile.resumeOriginalName,
          profilePhoto: user.profile.profilePhoto,
        },
      },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
