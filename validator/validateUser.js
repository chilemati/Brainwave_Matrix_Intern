const { check, validationResult } = require("express-validator");
const User = require("../models/user");
exports.validateUser = [
  check("password")
    .isString()
    .withMessage("password must be a s string")
    .isStrongPassword()
    .withMessage(
      "Password must contain: Capital letter,number and special character"
    )
    .isLength({ min: 8 }),
  check("email")
    .isString()
    .withMessage("email must be a s string")
    .isEmail()
    .withMessage("Invalid email format: eg. example@gmail.com"),
  check("firstName")
    .isString()
    .withMessage("fisrtName must be a string")
    .isLength({ min: 2 })
    .withMessage("firstName can not be a character long"),
  check("lastName")
    .isString()
    .withMessage("lastName must be a string")
    .isLength({ min: 2 })
    .withMessage("lastName can not be a character long"),
  // check("role")
  //   .isString()
  //   .withMessage("role must be a string")
  //   .isIn(["normal", "Admin",])
  //   .withMessage("invalid role type"),
  async(req, res, next) => {
    try {
      let isUser = await User.findOne({'email':req.body.email});
      if(isUser) {
        res.json({err: 'A user already exist with this email'});
      }else{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({ errors: errors.array() });
        next();
        
        
      }
    } catch (error) {
      res.json({status:false,error});
    }
  }
];
