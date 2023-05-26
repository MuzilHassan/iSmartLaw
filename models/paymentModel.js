const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new mongoose.Schema(
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
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("paymentModel", paymentSchema);
