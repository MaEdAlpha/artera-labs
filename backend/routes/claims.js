const client = require("./mongo-client");
const express = require("express");
const {body, validationResult } = require('express-validator');
const router = express.Router();

router.put("/claims",
body('ksmAddr').isLength({min:47, max:47}).trim(),
 async(req,res,next) => {
    try{
        const data = req.body;
        const ksmAddr = data.ksmAddr;
        const mmAddr = data.mmAddr;
        const errors = validationResult(req);

        if(errors.isEmpty()){
            console.info(`${mmAddr} has queried for KSM ${ksmAddr}`);
            
            const query =  {
                previousAddr: ksmAddr, updated: false
            };

            const update = { $set: { 
                userWalletAddr: mmAddr,
                updated: true 
                }
            };

            const options =  {
                upsert:false,
                returnNewDocument:true
            };
            //Find and Update KSM addr
            new Promise( (resolve, reject) => {
                client.db("ArteraLabs").collection("migrate_users").findOneAndUpdate(
                    query, 
                    update, 
                    options,
                    async (err,doc) => {
                        if(err){
                            console.debug(err);
                            reject(err);
                            next(err);
                        } else {
                            console.log('Query completed');
                            resolve(doc);
                            next();
                        }
                    }
                );
            }).then( dbResponse => {

                let body = { confirmationID: null, bueno: false }
                if(dbResponse.lastErrorObject.n === 1 && dbResponse.lastErrorObject.updatedExisting){
                    const userValue = dbResponse.value.uniqueID;
                    [ body.confirmationID, body.bueno ] = [ userValue, true ];
                    res.status(200).json(body);
                }else{
                    res.status(200).json(body);
                }
                next();
            });
        } else {
            console.log('Validation did not pass for mmAddr: ', mmAddr);
            console.debug(errors.array());
            res.status(504).json({msg:'The horse says: Doctorate DENIED.'});
        } 

    }catch(e){
        console.debug('Error on migration query: ', e);
    }
});


module.exports = router;
