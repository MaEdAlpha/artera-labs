const client = require('./mongo-client');

const express = require('express');
const router = express.Router();

router.put("/cast", async (req,res,next) => {
    
    const data = req.body.proposalData;
    const filter = {proposal: data.proposal};
    const proposalObj = {
        prop: data.proposal,
        yesVote: data.castYesVote,
        voteStrength: data.strength,
        ts: new Date(Date.now()),
    }
    let update = {}
    try{

        new Promise ((resolve,reject) =>{
            client.db("ArteraLabs").collection("arterians").updateOne(
                { arterianID: data.arterianAddr }, 
                { $push: { supported_proposal: proposalObj } },
                { upsert:false}, 
                async (err,doc) => {
                    if(err){
                        reject(err)
                        next(err);
                    }else{
                        console.log('User proposal object updated!');
                        resolve(doc);
                        next();
                    }
                }
            ) 
        }).then((value) => {
            console.log(value);
            next();
        });

        update = data.castYesVote ? 
            { $inc: { yesVoteStrength: data.strength, totalVoteStrength: data.strength, totalVotes: 1 } } 
            :
            { $inc: { totalVoteStrength: data.strength, totalVotes: 1 } };
        
        client.db("ArteraLabs").collection("projects_proposals").updateOne( filter, update, {upsert:false}, async (err,doc) => {
            if(err){
                console.log('PROPOSAL_ERR occurred');
                console.warn(err);
                res.status(204).json({body: 'CAST_ERR'});
                next();
            } else {
                res.status(200).json({body: 'CAST_ACK'});
                next();
            }
        });
    } catch (err){
        next(err);
    }

    
});

module.exports = router;