const verifyToken = require("../services/verifyToken");
require('dotenv').config();
const {   ROLE} = process.env

module.exports.isAdmin = async (req, res, next) => {
    const token = req.headers?.token;
  try {
    const isToken = await verifyToken(token);
    if (isToken.status) {
        if(isToken.decoded.role === ROLE) {
            next();

        }else{

            res.json({ status: false, msg: "For admin only" });
        }
    } else {
      res.json({ status: false, msg: "Please login to continue" });
    }
  } catch (error) {
    res.json({ status: false, msg: "Please login to continue" });
  }
};
