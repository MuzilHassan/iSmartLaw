const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const caseSchema = new Schema(
  {
    lawyerId: {
      type: Schema.Types.ObjectId,
      ref: "lawyerModel",
      required: true,
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "clientModel",
      required: true,
    },
    judgeId: {
      type: Schema.Types.ObjectId,
      ref: "clientModel",
    },
    caseType: {
      type: String,
      required: true,
    },
    caseDescription: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Closed"],
      default: "Pending",
    },
    nextHearing: {
      type: Date,
    },
    hearingComment: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("caseModel", caseSchema);
