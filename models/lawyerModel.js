const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    license: {
      type: String,
      required: true,
    },
    resetLink: {
      data: String,
      expiresAt: 0,
      default: "",
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    caseHistory: {
      type: Array,
      default: [],
    },

    profilePicture: {
      type: String,
    },
    success_ratio: {
      type: {},
    },
    about: {
      type: String,
    },
    rating: {
      type: Number,
    },
    totalNumberOfWonCases: {
      type: Number,
      default: "",
    },
    yearsOfExperience: {
      type: Array,
      default: [],
    },
    bestLawerRank: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lawyerModel", lawyerSchema);
