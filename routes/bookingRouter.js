const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel");
const lawyerModel = require("../models/lawyerModel");
const clientModel = require("../models/clientModel");
const uuid = require("uuid");
router.post("/", async (req, res) => {
  const clientId = req.body.clientId;
  const lawyerId = req.body.lawyerId;
  const date = req.body.date;
  const roomId = uuid.v4();
  console.log(clientId, lawyerId);
  try {
    const client = await clientModel.findById(clientId);
    if (!client) {
      return res.status(200).send({ message: "nhoi", success: false });
    }
    const lawyer = await lawyerModel.findById(lawyerId);
    if (!lawyer) {
      return res.status(200).send({ message: "nhoi", success: false });
    }
    const booking = new bookingModel({
      clientId,
      lawyerId,
      date,
      roomId,
    });
    lawyer.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${client.name}`,
      onClickPath: "/lawyer/appointments",
    });
    await lawyer.save();
    await booking.save();
    res.json({
      message: "Booking request submitted successfully",
      success: true,
    });
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error Occured", success: false, err: err.message });
  }
});
router.post("/acceptBooking", async function (req, res) {
  const { bookingId } = req.body;

  try {
    const booking = await bookingModel
      .findById(bookingId)
      .populate("lawyerId", "name");
    booking.status = "Accepted";
    const client = await clientModel.findById(booking.clientId);
    client.unseenNotifications.push({
      type: "appointment-request",
      message: `you   appointment request has been Accepted by ${booking.lawyerId.name}`,
    });
    await client.save();
    await booking.save();
    res.json({ message: "Booking accepted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while accepting the booking" });
  }
});

router.post("/rejectBooking", async function (req, res) {
  const { bookingId } = req.body;

  try {
    const booking = await bookingModel
      .findById(bookingId)
      .populate("lawyerId", "name");
    booking.status = "Rejected";
    console.log(booking);
    const client = await clientModel.findById(booking.clientId);
    client.unseenNotifications.push({
      type: "appointment-request",
      message: `you   appointment request has been Rejected by ${booking.lawyerId.name}`,
    });
    await booking.save();
    await client.save();
    res.json({ message: "Booking rejected successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while rejecting the booking",
      err: err.message,
    });
  }
});

module.exports = router;
