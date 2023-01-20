const express = require("express");
const router = express.Router();
const lawyerModel = require("../models/lawyerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const email = await lawyerModel.findOne({ email: req.body.email });
    console.log("muz2");
    if (!email) {
      console.log(req.body);
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      req.body.password = hashPass;
      const client = new lawyerModel(req.body);
      await client.save();
      res
        .status(200)
        .send({ message: "Acoount created successfully", success: true });
    } else {
      res
        .status(200)
        .send({ message: "email is already taken", success: false });
    }
  } catch (err) {
    res
      .status(400)
      .send({ message: "Error while creating new user", success: false, err });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await lawyerModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Account Dosent Exits", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "The Password you entered is incorrect",
        success: false,
      });
    } else {
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (err) {
    res.status(500).send({ message: "Error occured", success: false, err });
  }
});

module.exports = router;
