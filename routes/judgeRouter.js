const express = require("express");
const router = express.Router();
const judgeModel = require("../models/judgeModel");
const caseModel = require("../models/caseModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/login", async (req, res, next) => {
  try {
    const user = await judgeModel.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isPasswordCorrect, req.body.password);
    if (!isPasswordCorrect) return next(createError(404, "User not found!"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails } });
  } catch (err) {
    console.log(err);
  }
});

router.get("/todaysCases/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

    const cases = await caseModel
      .find({
        judgeId: id,
        date: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Add 24 hours to the current date
        },
      })
      .populate("lawyerId", "name")
      .populate("clientId", "name")
      .populate("judgeId", "court");

    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/weeklyCases/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const currentDate = new Date();
    const oneWeekAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    ); // Subtract 7 days from the current date

    const cases = await caseModel
      .find({
        judgeId: id,
        date: {
          $gte: oneWeekAgo,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Add 24 hours to the current date
        },
      })
      .populate("lawyerId", "name")
      .populate("clientId", "name")
      .populate("judgeId", "court");

    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/acceptedCases/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cases = await caseModel
      .find({ judgeId: id, status: "Accepted" })
      .populate("lawyerId", "name")
      .populate("clientId", "name")
      .populate("judgeId", "court");

    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/closedCases/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const cases = await caseModel
      .find({ judgeId: id, status: "Closed" })
      .populate("lawyerId", "name")
      .populate("clientId", "name")
      .populate("judgeId", "court");

    res.status(200).json(cases);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
