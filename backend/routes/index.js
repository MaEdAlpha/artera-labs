const express = require("express");
const router = express.Router();

//Where we define route handling using express.Router()

router.get("/test", (req, res,next) => {
  res.status(200).send({data: 'Hi these are the projects'});
  next();
});

module.exports = router;