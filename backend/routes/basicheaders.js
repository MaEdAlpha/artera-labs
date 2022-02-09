const express = require("express");
const handler = express.Router();

handler.use((req, res, next) => {
    // Website you wish to allow to connect |production| https://arteralabs.net
    res.setHeader('Access-Control-Allow-Origin', 'https://arteralabs.net');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  module.exports = handler;