const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  console.log();
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("error");
        res.status(401).send({ message: "Auth failed", success: false });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(401).send({ message: "Authentication failed", success: false });
  }
};
