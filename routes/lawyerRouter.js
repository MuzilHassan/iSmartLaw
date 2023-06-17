const express = require("express");
const router = express.Router();
const lawyerModel = require("../models/lawyerModel");
const clientModel = require("../models/clientModel");
const caseModel = require("../models/caseModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const upload = require("../config/multer");
const paymentModel = require("../models/paymentModel");
router.post("/addall", async (req, res) => {
  const lawyers = [
    {
      name: "Ali Hassan",
      email: "ali.hassan@example.com",
      password: "pass1234",
      phone: 9876543210,
      city: "Lahore",
      address: "789, PQR Street",
      license: "PQR98765",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Dedicated lawyer specializing in criminal law.",
      totalNumberOfWonCases: 7,
      rating: 4.3,
      yearsOfExperience: 9,
      bestLawerRank: 0,
      category: "corporate",
    },
    {
      name: "Ayesha Malik",
      email: "ayesha.malik@example.com",
      password: "pass9876",
      phone: 1234509876,
      city: "Islamabad",
      address: "567, LMN Street",
      license: "LMN54321",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Experienced family law attorney providing personalized services.",
      totalNumberOfWonCases: 12,
      rating: 4.8,
      yearsOfExperience: 10,
      bestLawerRank: 0,
      category: "corporate",
    },
    {
      name: "Usman Ahmed",
      email: "usman.ahmed@example.com",
      password: "usman456",
      phone: 2345678901,
      city: "Karachi",
      address: "987, XYZ Street",
      license: "XYZ23456",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about:
        "Skilled corporate lawyer with a track record of successful mergers and acquisitions.",
      totalNumberOfWonCases: 15,
      rating: 4.9,
      yearsOfExperience: 12,
      bestLawerRank: 0,
      category: "civil",
    },
    {
      name: "Zainab Qureshi",
      email: "zainab.qureshi@example.com",
      password: "zainab789",
      phone: 3456789012,
      city: "Lahore",
      address: "654, MNO Street",
      license: "MNO34567",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Passionate advocate for personal injury cases.",
      totalNumberOfWonCases: 8,
      rating: 4.4,
      yearsOfExperience: 7,
      bestLawerRank: 0,
      category: "family",
    },
    {
      name: "Faisal Mahmood",
      email: "faisal.mahmood@example.com",
      password: "faisal321",
      phone: 4567890123,
      city: "Islamabad",
      address: "321, RST Street",
      license: "RST89012",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Experienced lawyer specializing in criminal law.",
      totalNumberOfWonCases: 10,
      rating: 4.7,
      yearsOfExperience: 9,
      bestLawerRank: 0,
      category: "personal_injury",
    },
    {
      name: "Fatima Shah",
      email: "fatima.shah@example.com",
      password: "fatima654",
      phone: 5678901234,
      city: "Karachi",
      address: "012, GHI Street",
      license: "GHI56789",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Dedicated advocate for family law matters.",
      totalNumberOfWonCases: 6,
      rating: 4.1,
      yearsOfExperience: 5,
      bestLawerRank: 0,
      category: "personal_injury",
    },
    {
      name: "Kamran Ali",
      email: "kamran.ali@example.com",
      password: "kamran123",
      phone: 6789012345,
      city: "Lahore",
      address: "345, UVW Street",
      license: "UVW67890",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Experienced corporate lawyer handling complex legal issues.",
      totalNumberOfWonCases: 13,
      rating: 4.9,
      yearsOfExperience: 11,
      bestLawerRank: 0,
      category: "family",
    },
    {
      name: "Amina Khan",
      email: "amina.khan@example.com",
      password: "amina987",
      phone: 7890123456,
      city: "Islamabad",
      address: "901, OPQ Street",
      license: "OPQ78901",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Passionate advocate for family law matters.",
      totalNumberOfWonCases: 9,
      rating: 4.3,
      yearsOfExperience: 8,
      bestLawerRank: 0,
      category: "personal_injury",
    },
    {
      name: "Farhan Ahmed",
      email: "farhan.ahmed@example.com",
      password: "farhan123",
      phone: 8901234567,
      city: "Karachi",
      address: "678, XYZ Street",
      license: "XYZ67890",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about:
        "Skilled criminal defense attorney with a successful trial record.",
      totalNumberOfWonCases: 11,
      rating: 4.7,
      yearsOfExperience: 10,
      bestLawerRank: 0,
      category: "corporate",
    },
    {
      name: "Sadia Malik",
      email: "sadia.malik@example.com",
      password: "sadia987",
      phone: 9012345678,
      city: "Lahore",
      address: "123, ABC Street",
      license: "ABC90123",
      resetLink: "",
      unseenNotifications: [],
      seenNotification: [],
      caseHistory: [],
      profilePicture: "",
      about: "Experienced advocate specializing in personal injury cases.",
      totalNumberOfWonCases: 7,
      rating: 4.5,
      yearsOfExperience: 6,
      bestLawerRank: 0,
      category: "corporate",
    },
  ];

  const add = await lawyerModel.insertMany(lawyers);

  res
    .status(200)
    .send({ message: "All lawyers created successfully", success: true });
});

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

router.put("/giveranking", async (req, res) => {
  try {
    const categories = [
      "civil",
      "corporate",
      "criminal",
      "family",
      "personal_injury",
    ];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      // Fetch lawyers in the current category
      const lawyers = await lawyerModel.find({ category });

      // Calculate the rank based on the formula
      lawyers.sort(
        (a, b) =>
          b.rating +
          b.totalNumberOfWonCases -
          a.rating +
          a.totalNumberOfWonCases
      );

      // Update the bestLawerRank field
      lawyers.forEach((lawyer, index) => {
        lawyer.bestLawerRank = index + 1;
      });

      // Save the updated lawyer documents
      await Promise.all(lawyers.map((lawyer) => lawyer.save()));

      console.log(
        `Best lawyer ranks updated successfully for ${category} category!`
      );
    }

    res.status(200).send({
      message: "Best lawyer ranks updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating best lawyer ranks in all categories:", error);
  }
});

router.get("/search/:category", async (req, res) => {
  let category = req.params.category;

  try {
    const lawyers = await lawyerModel
      .find({ category })
      .sort({ bestLawerRank: 1 })
      .limit(10);

    console.log(`Top 10 lawyers in ${category} category:`, lawyers);
    return res.status(200).json(lawyers);
  } catch (error) {
    console.error(
      `Error retrieving top lawyers in ${category} category:`,
      error
    );
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await lawyerModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User Account Dosent Exits", success: false });
    }
    console.log(user);
    if (req.body.password != user.password) {
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

  upload.single("profilePicture"),
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
    const perPage = 6;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * perPage;

    const users = await lawyerModel
      .find()
      .select("name about profilePicture phone address _id")
      .skip(skip)
      .limit(perPage);

    const totalLawyers = await lawyerModel.countDocuments();
    const totalPages = Math.ceil(totalLawyers / perPage);

    if (!users) {
      return res.status(200).json({ success: false, message: "no users" });
    }

    return res
      .status(200)
      .json({ success: true, users, totalPages, currentPage: page });
  } catch (error) {
    // Handle error
  }
});

router.put("/update-profile", authMiddleware, async (req, res) => {
  console.log("gewaa");
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

router.put("/change-password", authMiddleware, async (req, res) => {
  try {
    console.log("bayanggu");
    const { oldPassword, newPassword } = req.body;

    const user = await lawyerModel.findById(req.body.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const isPasswordMatch = oldPassword == user.password;
    console.log(oldPassword, newPassword, user.password);
    if (!isPasswordMatch) {
      return res
        .status(201)
        .json({ message: "Old password doesn't match", success: false });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ message: "Password changed successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error while changing password",
      success: false,
      error: error.message,
    });
  }
});

router.post("/add-case", authMiddleware, async (req, res) => {
  try {
    const { clientEmail, caseType, caseDescription, date } = req.body;
    const lawyerId = req.body.userId;

    // Fetch the client ID based on the provided client email
    const client = await clientModel.findOne({ email: clientEmail });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
    const clientId = client._id;

    let caseNumber;
    let isUnique = false;

    // Loop until a unique case number is generated
    while (!isUnique) {
      caseNumber = Math.floor(100000 + Math.random() * 900000);

      // Check if the case number already exists in the database
      const existingCase = await caseModel.findOne({ caseNumber });
      if (!existingCase) {
        isUnique = true;
      }
    }

    // Create a new case
    const newCase = new caseModel({
      lawyerId,
      clientId,
      caseType,
      caseDescription,
      date,
      caseNumber, // Assign the generated case number
    });

    // Save the case to the database
    await newCase.save();

    res.status(200).json({
      success: true,
      message: "Case added successfully",
      case: newCase,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/cases/pending", authMiddleware, async (req, res) => {
  try {
    const lawyerId = req.body.userId;

    const pendingCases = await caseModel
      .find({ lawyerId, status: "Pending" })
      .populate("clientId", "name email phone ")
      .exec();

    const formattedCases = pendingCases.map((caseItem) => ({
      clientName: caseItem.clientId.name,
      clientEmail: caseItem.clientId.email,
      clientPhone: caseItem.clientId.phone,
      createdAt: caseItem.createdAt,
      // Include other case details if needed
    }));

    res.json(formattedCases);
  } catch (error) {
    console.error("Error while fetching pending cases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/cases/details", authMiddleware, async (req, res) => {
  try {
    const lawyerId = req.body.userId;

    const caseDetails = await caseModel
      .find({ lawyerId })
      .populate("judgeId", "name court courtAddress")
      .populate("clientId", "name")
      .select(" nextHearing hearingComment")
      .exec();

    const formattedCases = caseDetails.map((caseItem) => ({
      judgeName: caseItem.judgeId.name,
      court: caseItem.court,
      courtAddress: caseItem.courtAddress,
      hearingDate: caseItem.nextHearing,
      clientName: caseItem.clientId.name,
      previousRemarks: caseItem.hearingComment,
    }));

    res.json(formattedCases);
  } catch (error) {
    console.error("Error while fetching case details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/cases/latest/:id", authMiddleware, async (req, res) => {
  try {
    const lawyerId = req.params.id;
    console.log(lawyerId, "hayaa hai waa");
    const pendingCases = await caseModel
      .find({ lawyerId, status: "Pending" })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("caseDescription")
      .exec();

    const descriptions = pendingCases.map((caseItem) => caseItem.description);

    res.json(descriptions);
  } catch (error) {
    console.error("Error while fetching pending cases:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/payments/paid/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.params);
    const lawyerId = req.params.id;
    const paidAmount = await paymentModel
      .aggregate([
        {
          $match: { lawyerId, status: "Paid" },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ])
      .exec();

    const totalPaidAmount = paidAmount.length ? paidAmount[0].totalAmount : 0;

    res.json({ totalPaidAmount });
  } catch (error) {
    console.error("Error while fetching total paid amount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/payments/pending/:id", authMiddleware, async (req, res) => {
  try {
    const lawyerId = req.params.id;

    const pendingAmount = await paymentModel
      .aggregate([
        {
          $match: { lawyerId, status: "Pending" },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ])
      .exec();

    const totalPendingAmount = pendingAmount.length
      ? pendingAmount[0].totalAmount
      : 0;

    res.json({ totalPendingAmount });
  } catch (error) {
    console.error("Error while fetching total pending amount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/cases/Accepted", authMiddleware, async (req, res) => {
  try {
    console.log("coming here");
    const lawyerId = req.body.userId;

    const caseDetails = await caseModel
      .find({ lawyerId, status: "Accepted" })
      .populate("judgeId", "name court courtAddress")
      .populate("clientId", "name")
      .select(" nextHearing hearingComment caseNumber caseDescription")
      .exec();

    res.json(caseDetails);
  } catch (error) {
    console.error("Error while fetching case details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
