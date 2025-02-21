const { check, validationResult } = require("express-validator");

exports.validateBlog = [
  check("title")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 4 })
    .withMessage("title is tool short "),
  check("author")
    .isString()
    .withMessage("author must be a string")
    .isLength({ min: 4 })
    .withMessage("author is tool short "),
  check("body")
    .isString()
    .withMessage("body must be a string")
    .isLength({ min: 4 })
    .withMessage("content is too short"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({ errors: errors.array() });
        next();
      },
];
