const express = require("express");
const router = express.Router();
const lawyerModel = require("../models/lawyerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const upload = require("../config/multer");

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
      return res.status(200).send({ message: "Auth failed", success: false });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        unseenNotifications: user.unseenNotifications,
        seenNotification: user.seenNotification,
        id: user._id,
        about: user.about,
        phone: user.phone,
        address: user.address,
        license: user.license,
        profilePicture: user.profilePicture,
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

router.post(
  "/update-profile-picture",

  upload.single("ProfilePicture"),
  authMiddleware,
  async (req, res) => {
    const { userId } = req.body;
    const { filename } = req.file;
    lawyerModel.findById(userId, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      }
      if (user.profilePicture) {
        const oldFilePath = path.join(
          __dirname,
          "..",
          "uploads",
          user.profilePicture
        );
        fs.unlink(oldFilePath, (err) => {
          if (err) console.log(err);
        });
      }
      lawyerModel
        .findByIdAndUpdate(userId, { profilePicture: filename }, { new: true })
        .then((user) => {
          res
            .status(200)
            .send({ user, message: "Profile picture updated successfully" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Internal server error");
        });
    });
  }
);

router.get("/lawyer-info", authMiddleware, async (req, res) => {
  const { userId } = req.body;
  lawyerModel
    .findById(userId)
    .select("-password -seenNotification -unseenNotifications")
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message, success: false });
      } else if (!user) {
        res.status(404).send({ message: "User not found", success: false });
      } else {
        res.send({ message: "succefull", success: true, user });
      }
    });
});
router.get("/all-lawyers", async (req, res) => {
  try {
    const users = await lawyerModel
      .find()
      .select("name about profilePicture phone address");
    if (!users) {
      return res.status(200).json({ success: false, message: "no users" });
    }
    return res.status(200).json({ success: true, users });
  } catch (error) {}
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  console.log(req.body);
  try {
    const validFields = [
      "name",
      "email",
      "password",
      "city",
      "address",
      "availabilityStatus",
      " timings",
      "experience",
      "about",
    ];
    let updates = {};
    for (const field of validFields) {
      if (req.body[field]) {
        updates[field] = req.body[field];
      }
    }

    const user = await lawyerModel.findByIdAndUpdate(req.body.userId, updates, {
      new: true,
      runValidators: true,
    });
    console.log(user);
    if (user) {
      return res.status(200).json({ success: true, updated: updates });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await lawyerModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.resetLink = {
      data: token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Hello ${user.name},</p><p>You recently requested to reset your password for your Lawyer account. 
      Please click on the link below to reset your password:</p><p><a href="${www.google.com}/reset-password/${token}">Reset Password</a></p><p>If you did not request this password reset, please ignore this email and your password will remain unchanged.</p>`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "password reset Link has been send" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await lawyerModel.findOne({
      resetLink: {
        data: token,
        expiresAt: { $gt: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(200)
        .json({ success: true, message: "Your token has been expired" });
    }
    user.password = password;
    user.resetLink = { data: "", expiresAt: 0 };
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "password changed successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
module.exports = router;
