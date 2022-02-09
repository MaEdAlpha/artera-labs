const client = require('./mongo-client');

const express = require("express");
const router = express.Router();


router.get("/stream", async (req, res, next) => {
  
    //'X-Accel-Buffering': turns off server buffering for SSE to work
    //PRODUCTION CORS : 'https://arteralabs.net'
    //TEST ENV: 'http://localhost:3000'
    //TODO can you wildcard Access-control-allow-origin?
    res.writeHead(200, {
        'Access-Control-Allow-Origin': 'https://arteralabs.net',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
    });

    //point to matches collection and watch it.
    const pipeline = [
      { $project: { url: 0 } } 
    ]
    const changeStream = client.db("ArteraLabs").collection("projects_proposals").watch(pipeline, { fullDocument : 'updateLookup' } );
    // Return all but the specified fields
    let keepAliveMS = 45 * 1000;
    let payload = {};
    //console.log("TESTING");

    function keepAlive(){
        res.write("event: message\n" + "data:heartbeat\n\n");
        setTimeout(keepAlive, keepAliveMS);
        next();
      }
      //send SSE events back to user
      changeStream.on('change', (next) => {

        //console.log(next.fullDocument);

        if(next.fullDocument.projectId && next.fullDocument.projectId.length < 8){
            const project = next.fullDocument;

            payload = {
                event: "PROJECT",
                projectAddr: project.wallet,
                artiste: project.artiste,
                totalContribution: project.fundedAmount
            }
        }

        if(next.fullDocument.propTag && next.fullDocument.propTag.length < 10){
            const proposal = next.fullDocument;

            payload ={
                event: "PROPOSAL",
                propTag: proposal.propTag,
                yesVotes: proposal.yesVoteStrength,
                totalVoteStrength: proposal.totalVoteStrength,
                totalVotes: proposal.totalVotes
            }
        }
        const data = JSON.stringify(payload);

        const msg = ("event: message\n" + "data: " + data + "\n\n");
        res.write(msg);
      })
      .on('error', err => {
        console.error('STRM_WTCH_ERR: ', err);  
        next(err);
      });

      //Persistent data log
      setTimeout(keepAlive, keepAliveMS);   
      next(); 
});

module.exports = router;