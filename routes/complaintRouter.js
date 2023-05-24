const express = require("express");
const router = express.Router();
const complain = require("../models/complaintModel");

router.post("/add", async (req, res) => {
  console.log(req.body);
  try {
    const client = new complain(req.body);
    await client.save();

    res
      .status(200)
      .send({ message: "compalint submitted  successfully", success: true });
  } catch (err) {
    res.status(400).send({ message: "Error Occured", success: false, err });
  }
});
module.exports = router;
