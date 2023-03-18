const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.log("error");
        res.status(401).send({ message: "Auth failed", success: false });
      } else {
        console.log("sae hoi");
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(401).send({ message: "Authentication failed", success: false });
  }
};
