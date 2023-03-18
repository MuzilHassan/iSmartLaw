const express = require("express");
const router = express.Router();
const lawyerModel = require("../models/lawyerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
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
      return res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (err) {
    res.status(500).send({ message: "Error occured", success: false, err });
  }
});

router.post("/get-Lawyer-info", authMiddleware, async (req, res) => {
  try {
    console.log(req.body.userId);
    const user = await lawyerModel.findOne({ _id: req.body.userId });
    console.log(user);
    if (!user) {
      res.status(200).send({ message: "Auth failed", success: false });
    }

    return res.status(200).send({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        unseenNotifications: user.unseenNotifications,
        seenNotification: user.seenNotification,
      },
    });
  } catch (error) {
    res.status(400).send({ success: false, message: "failed", error });
  }
});

router.post("/mark-all-as-seen", authMiddleware, async (req, res) => {
  const id = req.body.userId;
  try {
    const user = await lawyerModel.findById(id);

    if (!user) {
      return res.status(200).send({ success: false, message: "failed", error });
    }
    const unseenNotifications = user.unseenNotifications;
    const seenNotification = user.seenNotification;
    seenNotification.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotification = seenNotification;

    await user.save();
    res.status(200).send({
      success: true,
      message: "All notifications marked as seen",
    });
  } catch (err) {
    res.status(400).send({ success: true, message: err.message });
  }
});

router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  const id = req.body.userId;
  try {
    const user = await lawyerModel.findById(id);

    if (!user) {
      return res.status(200).send({ success: false, message: "failed", error });
    }
    user.seenNotification = [];
    await user.save();
    res.status(200).send({ success: true, message: "deleted Successfully" });
  } catch (err) {
    res.status(400).send({ success: true, message: err.message });
  }
});
module.exports = router;
