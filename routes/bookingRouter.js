const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel");
const lawyerModel = require("../models/lawyerModel");
const clientModel = require("../models/clientModel");

const authMiddleware = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, async (req, res) => {
  const clientId = req.body.userId;
  const lawyerId = req.body.bookingId;
  const date = req.body.appointmentDate;

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
    });
    lawyer.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${client.name}`,
      onClickPath: "/lawyer/lawyerAppointments",
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
router.get("/get-appointments", authMiddleware, async (req, res) => {
  try {
    const lawyer = await lawyerModel.findOne({ lawyerId: req.body.userId });
    const appointments = await bookingModel
      .find({ lawyerId: lawyer._id, status: "Pending" })
      .populate("clientId", "name phone email");
    console.log(appointments);
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      success: false,
      error,
    });
  }
});
router.get("/get-client-appointments", authMiddleware, async (req, res) => {
  try {
    const appointments = await bookingModel
      .find({ clientId: req.body.userId })
      .populate("lawyerId", "name phone email");
    console.log(appointments);
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      success: false,
      error,
    });
  }
});
router.get("/get-booked-appointments", authMiddleware, async (req, res) => {
  try {
    const lawyer = await lawyerModel.findOne({ lawyerId: req.body.userId });
    const appointments = await bookingModel
      .find({ lawyerId: lawyer._id, status: "Accepted" })
      .populate("clientId", "name phone email");
    console.log(appointments);
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      success: false,
      error,
    });
  }
});
router.put(
  "/change-appointment-date/:bookingId",
  authMiddleware,
  async (req, res) => {
    try {
      const booking = await bookingModel.findOneAndUpdate(
        { _id: req.params.bookingId },
        { $set: { date: req.body.appointmentDate } }, // Update the field name to appointmentDate
        { new: true }
      );

      if (!booking) {
        return res.status(404).send({
          message: "Booking not found",
          success: false,
        });
      }

      res.status(200).send({
        message: "Appointment date changed successfully",
        success: true,
        data: booking,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
        success: false,
        error,
      });
    }
  }
);
router.post("/create-appointment", authMiddleware, async (req, res) => {
  try {
    const { email, date } = req.body;
    const lawyerId = req.body.userId; // Obtained from authentication middleware

    // Find the client by email
    const client = await clientModel.findOne({ email });
    if (!client) {
      return res.status(404).json({
        message: "Client not found",
        success: false,
      });
    }
    console.log(client);
    // Create the appointment
    const appointment = new bookingModel({
      lawyerId,
      clientId: client._id,
      date,
      status: "Accepted",
    });
    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create appointment",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
