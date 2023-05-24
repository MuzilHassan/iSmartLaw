const mongoose = require("mongoose");

const judgeSchema = new mongoose.Schema(
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
    serviceNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    court: {
      type: String,
      required: true,
    },
    courtAddress: {
      type: String,
      required: true,
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
    seenNotification: {
      type: Array,
      default: [],
    },
    assignmentDate: {
      type: String,
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

module.exports = mongoose.model("judgeModel", judgeSchema);
