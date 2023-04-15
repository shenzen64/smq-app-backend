const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./keys");

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = "admin"
    
    if (decoded.username!=user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please Authenticate" });
  }
};
module.exports = requireAdmin;
