const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminModel = require("../models/adminModel");
const bookingModel = require("../models/bookingModel");
const clientModel = require("../models/clientModel");
const lawyerModel = require("../models/lawyerModel");
const judgeModel = require("../models/judgeModel");
const caseModel = require("../models/caseModel");

router.post("/addJudge", async (req, res) => {
  try {
    console.log(req.body);
    const email = await judgeModel.findOne({ email: req.body.email });
    if (!email) {
      console.log(req.body);
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      req.body.password = hashPass;
      const client = new judgeModel(req.body);
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
    res.status(400).send({ message: err.message, success: false, err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await adminModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Account Doesn't Exist", success: false });
    }

    // Compare the password directly
    if (user.password !== req.body.password) {
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
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/get-totalusers", async (req, res) => {
  try {
    const totalClients = await clientModel.countDocuments();
    const totalJudges = await judgeModel.countDocuments();
    const totalLawyers = await lawyerModel.countDocuments();
    const totalCount = totalClients + totalJudges + totalLawyers;
    res.status(200).send({ message: "Total users count", count: totalCount });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/get-totaljudges", async (req, res) => {
  try {
    const totalJudges = await judgeModel.countDocuments();
    res.status(200).send({ message: "Total judges count", count: totalJudges });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/get-totalclients", async (req, res) => {
  try {
    const totalClients = await clientModel.countDocuments();
    res
      .status(200)
      .send({ message: "Total clients count", count: totalClients });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});
router.get("/get-totallawyers", async (req, res) => {
  try {
    const totalClients = await lawyerModel.countDocuments();
    res
      .status(200)
      .send({ message: "Total clients count", count: totalClients });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});
router.get("/get-clients-lawyers", async (req, res) => {
  try {
    const clients = await clientModel.find(
      {},
      {
        password: 0,
        seenNotification: 0,
        unseenNotifications: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );
    const lawyers = await lawyerModel
      .find(
        {},
        {
          password: 0,
          seenNotification: 0,
          unseenNotifications: 0,
          createdAt: 0,
          updatedAt: 0,
        }
      )
      .lean();

    // Add 'isLawyer' field to each lawyer object
    const lawyersWithIsLawyer = lawyers.map((lawyer) => ({
      ...lawyer,
      isLawyer: true,
    }));

    const clientsLawyersData = [...clients, ...lawyersWithIsLawyer];
    res
      .status(200)
      .send({ message: "Clients and Lawyers data", data: clientsLawyersData });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.delete("/delete-client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    // Delete client from clientModel
    await clientModel.findByIdAndDelete(clientId);

    // Delete client's data from other related documents
    await bookingModel.deleteMany({ client: clientId });

    res
      .status(200)
      .send({ message: "Client deleted successfully", success: true });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.delete("/delete-lawyer/:lawyerId", async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;

    // Delete lawyer from lawyerModel
    await lawyerModel.findByIdAndDelete(lawyerId);

    // Delete lawyer's data from other related documents
    await bookingModel.deleteMany({ lawyer: lawyerId });
    await caseModel.deleteMany({ lawyer: lawyerId });

    res
      .status(200)
      .send({ message: "Lawyer deleted successfully", success: true });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/judges", async (req, res) => {
  try {
    const judges = await judgeModel.find({}, { password: 0 });

    res.status(200).send({ message: "Judges data", data: judges });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/cases/pending", async (req, res) => {
  try {
    const pendingCases = await caseModel.find({ status: "pending" });

    if (pendingCases.length === 0) {
      // If no pending cases found
      res.status(200).send({ message: "No pending cases found", data: [] });
    } else {
      // If pending cases found
      res
        .status(200)
        .send({ message: "Pending cases data", data: pendingCases });
    }
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.put("/cases/:caseId/assign-judge/:serviceNumber", async (req, res) => {
  try {
    const caseId = req.params.caseId;
    const serviceNumber = req.params.serviceNumber;

    // Find the judge by service number
    const judge = await judgeModel.findOne({ serviceNumber });

    if (!judge) {
      return res
        .status(404)
        .send({ message: "Judge not found", success: false });
    }

    // Find the case by ID and update the judge and status fields
    const updatedCase = await caseModel.findByIdAndUpdate(
      caseId,
      { judge: judge._id, status: "Accepted" },
      { new: true }
    );

    if (!updatedCase) {
      return res
        .status(404)
        .send({ message: "Case not found", success: false });
    }

    res.status(200).send({
      message: "Judge assigned to the case successfully",
      success: true,
      data: updatedCase,
    });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/cases/accepted", async (req, res) => {
  try {
    const acceptedCases = await caseModel
      .find({ status: "Accepted" })
      .populate({
        path: "clientId lawyerId judgeId",
        select: "name -_id -__v",
      })
      .select("-clientId -lawyerId -judgeId");

    if (acceptedCases.length === 0) {
      return res
        .status(404)
        .send({ message: "No accepted cases found", success: false });
    }

    res
      .status(200)
      .send({ message: "Accepted cases data", data: acceptedCases });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

router.get("/registrations", async (req, res) => {
  try {
    const registrations = await Promise.all([
      clientModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ]),
      lawyerModel.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    const clientRegistrations = {};
    const lawyerRegistrations = {};

    for (let i = 1; i <= 12; i++) {
      const monthName = new Date(2000, i - 1).toLocaleString("default", {
        month: "long",
      });
      clientRegistrations[monthName] = 0;
      lawyerRegistrations[monthName] = 0;
    }

    registrations[0].forEach((registration) => {
      const month = new Date(2000, registration._id - 1).toLocaleString(
        "default",
        { month: "long" }
      );
      clientRegistrations[month] = registration.count;
    });

    registrations[1].forEach((registration) => {
      const month = new Date(2000, registration._id - 1).toLocaleString(
        "default",
        { month: "long" }
      );
      lawyerRegistrations[month] = registration.count;
    });

    res.status(200).send({
      message: "Registrations data",
      clientRegistrations,
      lawyerRegistrations,
    });
  } catch (err) {
    res.status(500).send({ message: err.message, success: false, err });
  }
});

module.exports = router;
