const express = require("express");
const router = express.Router();
const clientModel = require("../models/clientModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const email = await clientModel.findOne({ email: req.body.email });
    console.log("muz2");
    if (!email) {
      console.log(req.body);
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      req.body.password = hashPass;
      const client = new clientModel(req.body);
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
    const user = await clientModel.findOne({ email: req.body.email });
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
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    console.log(req.body.userId);
    const user = await clientModel.findOne({ _id: req.body.userId });
    console.log(user);
    if (!user) {
      return res.status(200).json({ message: "Auth failed", success: false });
    }
    const data = {
      name: user.name,
      email: user.email,
    };
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "failed", error });
  }
});
module.exports = router;
