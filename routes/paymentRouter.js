const express = require("express");
const router = express.Router();
const Stripe = require("stripe")(process.env.SECRET_KEY);
const paymentModel = require("../models/paymentModel");
const clientModel = require("../models/clientModel");
const lawyerModel = require("../models/lawyerModel");
const authMiddleware = require("../middlewares/authMiddleware");
const nodemailer = require("nodemailer");
router.post("/:Id", async (req, res) => {
  let status, error;
  const paymentId = req.params.Id;
  console.log(paymentId);
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      metadata: {},
      amount,
      currency: "PKR",
    });
    const payment = await paymentModel.findByIdAndUpdate(
      paymentId,
      { status: "Paid" },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    status = "success";
  } catch (error) {
    console.log(error.message);
    status = "Failure";
  }
  res.json({ error, status });
});

router.post("/addPayment", async (req, res) => {
  try {
    console.log(req.body);
    const { lawyerId, clientId, amount, desc } = req.body;

    // Find the lawyer based on the lawyerId
    const lawyer = await lawyerModel.findById(lawyerId);
    if (!lawyer) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    // Find the client based on the clientId
    const client = await clientModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Create the payment
    const payment = new paymentModel({
      lawyerId,
      clientId,
      amount,
      desc,
    });
    console.log(req.body);
    // Save the payment to the database
    await payment.save();

    // Send email to the client
    /* const transporter = nodemailer.createTransport({
      // Configure the nodemailer transporter for sending emails
      // Replace the placeholders with your email configuration
      host: "your_smtp_host",
      port: 587,
      secure: false,
      auth: {
        user: "your_email",
        pass: "your_password",
      },
    });

    const mailOptions = {
      from: "your_email",
      to: client.email, // Send the email to the client's email address
      subject: "Payment Details",
      text: `Dear ${client.name},\n\nYou have received a payment of ${amount} for ${desc}.\n\nThank you.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
*/
    res.status(200).json({ message: "Payment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const pendingPayments = await paymentModel
      .find({
        clientId: req.body.userId,
        status: "Pending",
      })
      .populate("lawyerId", "name");

    res.status(200).json({ payments: pendingPayments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
