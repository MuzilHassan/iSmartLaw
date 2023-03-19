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
    experience: {
      type: Array,
      default: [],
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    timings: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
    },
    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lawyerModel", lawyerSchema);
