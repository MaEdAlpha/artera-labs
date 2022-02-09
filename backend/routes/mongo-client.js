const express = require('express');
const app = express();

const mongodb = require("mongodb");
const env = require("dotenv").config().parsed;

const ObjectId = require('mongodb').ObjectId;
const MongoClient = mongodb.MongoClient;
const connectionString = env.MONGO_CNX;

const options = {useUnifiedTopology: true, useNewUrlParser: true};
const client = new MongoClient(connectionString, options );

//connect to DB.
async function connectDB(client){
  try {
      await client.connect()
      .then((response) =>  { app.locals.db = response;   console.log('Connected to database!')})
      .catch(() => { console.log('Connection failed!');});
  } catch (e) {
      console.log("MongoClient connection error.");
      console.error(e);
  } finally {}
}

connectDB(client).catch(console.error);

module.exports = client;

