const verifyToken = require("../services/verifyToken");

module.exports.isLoggedin = async (req, res, next) => {
  const token = req.headers?.token;
  try {
    const isToken = await verifyToken(token);
    if (isToken.status) {
      next();
    } else {
      res.json({ status: false, msg: "Please login to continue" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Please login to continue" });
  }
};
