const client = require("./mongo-client");

const express = require("express");
const router = express.Router();

/*
  arteranProject = {
    artiste: "devilla"
    fundGoal: 10000
    fundedAmount: 1800
    imgSrc: "../../assets/img/devilla.png"
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim projectId est laborum."
    projectId: "a1"
    wallet: "0xc72b9eDEf0367Dfc0e14e5b0e26F9ebaB7Dd2ff5"
    expires: DateTime
  }

*/

router.get("/projects", async (req, res,next) => {
    const cursor = await client.db("ArteraLabs").collection("projects_proposals").find({},{ projection: { _id: 0}});
    const body = await cursor.toArray();
    res.status(200).json({body});
    next();
  });
  
  module.exports = router;