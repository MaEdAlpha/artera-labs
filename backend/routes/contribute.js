const client = require("./mongo-client");

const express = require("express");
const router = express.Router();

//Posts a user's contribution to arteran
router.put("/contribute", async (req, res, next) => {
    const obj = req.body.transactionData;
    console.log(obj);
    //object model
    //   req.body.transactionData = {
    //     tag: req.body.projectId
    //     projectAritst: req.body.artiste
    //     arterianAddr: "0x86864f58bb382c32a0ef047be0c15e27cd77543a",
    //     projectAddr: "0xD0F48Dc4e5ec1937019f654aeEAeb9De697b4C5b",
    //     contributionAmount: 999,
    //     projectCount: 0
    //   };
    // console.log(obj);
    let logTime = new Date(Date.now());

    const contributionObject = {
        proj: obj.projectAddr,
        projTag: obj.tag,
        amount: obj.contributionAmount,
        ts: logTime 
    }; 
    //write this to db if user is making first time contribution.
    const arterianModel = {
        arterianID: obj.arterianAddr,
        projectArtist: obj.artiste,
        supported_projects: [contributionObject],
        supported_proposal: [],
    };
    
    let count = obj.projectCount;

    try{
        //updated total funded amount to project as well.  projects_proposals
        console.log('Project lookup: ' , obj.projectAddr);
        client.db("ArteraLabs").collection("projects_proposals").updateOne( { $and: [ {wallet: obj.projectAddr}, { artiste: obj.artiste }, {projectId: obj.tag  } ]}, { $inc: {fundedAmount: obj.contributionAmount} }, {upsert: false} , async (err,doc) =>{
            if(err){
                console.log(err);
            } else {
                console.log("Updated project");
            }
        });
        
        if(count === null){ //add new user document if none exists.
            await client.db("ArteraLabs").collection("arterians").insertOne(arterianModel);
            res.status(200).json({data:"succesfully created new user doc"});
            next();
        } else {
            const filter = {arterianID: obj.arterianAddr};
            const update = { $push: { supported_projects: contributionObject } }
            const options = {upsert:false}; 
            
            client.db("ArteraLabs").collection("arterians").updateOne(filter, update, options, async (err, doc) => {
                if(err){
                    console.log(err);
                } else {
                    console.log("Updated arterian supported_projects @ ", obj.arterianAddr);
                }
            });
            res.status(200).json({data:"Updated userDoc"});
            next();
        }
    } catch(err) {
        next(err);
    }
});

module.exports = router;
