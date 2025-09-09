import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'recruiter'],
    required: true
  },
  recentlyViewed: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  }
],
  profile: {
    bio: {
      type: String
    },
    skills: [
      {type: String}  // Array of strings
    ],
    resume: {
      type: String  // File path or URL
    },
    resumeOriginalName: {
      type: String  // Original file name
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'  // Reference to a Company model
    },
    profilePhoto: {
      type: String , // File path or URL
      default:""
    }
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
