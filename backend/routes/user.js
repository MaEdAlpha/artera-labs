const client = require("./mongo-client");

const express = require("express");
const router = express.Router();

router.get("/user/:uid", async (req, res, next) => {
const query = { "arterianID": req.params.uid };
let isActive = false;
let count = null;

  new Promise( (resolve, reject) => {
    
    client.db("ArteraLabs").collection("arterians").findOne(query, async (err, doc) =>{
      try{
        console.log(`Searching for ${req.params.uid}...`);
        isActive = doc === null ? false : true;
        count = isActive ? doc.supported_projects.length : 0;
        // console.log(doc);
        resolve({data: doc});
      }catch(err){
        console.log(err);
        next(err);
      }
    })
  }).then( (value) => {
      value.data !== null ? console.log('User found: ', value.data.arterianID) : console.log("New user detected");
      res.status(200).json({isActive: isActive, data: value.data});
      next();
    }).catch( error => { res.status(403); next(error); } );
});

module.exports = router;