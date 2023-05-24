const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
const connectDb = require("./config/dbConfig");

const clientRouter = require("./routes/clientsrouter");
const lawyerRouter = require("./routes/lawyerRouter");
const complaintRouter = require("./routes/complaintRouter");
const bookingRouter = require("./routes/bookingRouter");
const conversationRouter = require("./routes/conversationRouter");
const messagesRouter = require("./routes/messagesRouter");
const imagesRouter = require("./routes/imagesRouter");
const adminRouter = require("./routes/adminRouter");
app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/client", clientRouter);
app.use("/api/lawyer", lawyerRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messagesRouter);
app.use("/file", imagesRouter);

app.use("/api/admin", adminRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

connectDb();
