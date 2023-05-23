const express = require("express");
const router = express.Router();
const lawyerModel = require("../models/lawyerModel");
const clientModel = require("../models/clientModel");
const bookingModel = require("../models/bookingModel");
const conversationModel = require("../models/conversationModel");
const messagesModel = require("../models/messagesModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/contactList/", authMiddleware, async (req, res) => {
  const id = req.body.userId;
  console.log(id, "bayangu tirangu");
  try {
    const lawyerData = await lawyerModel.findById(id);
    const clientData = await clientModel.findById(id);

    if (!lawyerData && !clientData) {
      return res.status(404).json({ message: "Data not found" });
    }

    let bookings = [];

    if (lawyerData) {
      bookings = await bookingModel
        .find({ lawyerId: id })
        .populate("clientId", "name");
    } else if (clientData) {
      bookings = await bookingModel
        .find({ clientId: id })
        .populate("lawyerId", "name");
    }

    const bookedWith = bookings.map((booking) => {
      const { _id, name } = lawyerData ? booking.clientId : booking.lawyerId;
      return { _id, name };
    });

    // Filter out duplicate person details using Set
    const uniqueBookedWith = Array.from(
      new Set(bookedWith.map((person) => person._id))
    ).map((_id) => {
      return bookedWith.find((person) => person._id === _id);
    });

    return res.json(uniqueBookedWith);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add", async (request, response) => {
  let senderId = request.body.senderId;
  let receiverId = request.body.receiverId;

  const exist = await conversationModel.findOne({
    members: { $all: [receiverId, senderId] },
  });

  if (exist) {
    response.status(200).json("conversation already exists");
    return;
  }
  const newConversation = new conversationModel({
    members: [senderId, receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    response.status(200).json(savedConversation);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post("/get", async (request, response) => {
  try {
    const conversation = await conversationModel
      .findOne({
        members: { $all: [request.body.senderId, request.body.receiverId] },
      })
      .select("_id");
    response.status(200).json(conversation._id);
  } catch (error) {
    response.status(500).json(error);
  }
});
module.exports = router;
