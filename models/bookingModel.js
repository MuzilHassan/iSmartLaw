const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  messages: [
    {
      sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
