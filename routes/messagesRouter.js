const express = require("express");
const router = express.Router();

const conversationModel = require("../models/conversationModel");
const messagesModel = require("../models/messagesModel");

router.post("/add", async (request, response) => {
  const newMessage = new messagesModel(request.body);
  try {
    await newMessage.save();
    await conversationModel.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });
    response.status(200).json("Message has been sent successfully");
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/get/:id", async (request, response) => {
  try {
    const messages = await messagesModel.find({
      conversationId: request.params.id,
    });
    response.status(200).json(messages);
  } catch (error) {
    response.status(500).json(error);
  }
});
module.exports = router;
