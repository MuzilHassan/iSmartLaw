const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const connectDb = require("./config/dbConfig");

const clientRouter = require("./routes/clientsrouter");
const lawyerRouter = require("./routes/lawyerRouter");
const complaintRouter = require("./routes/complaintRouter");
const bookingRouter = require("./routes/bookingRouter");

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/client", clientRouter);
app.use("/api/lawyer", lawyerRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/bookings", bookingRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

connectDb();
