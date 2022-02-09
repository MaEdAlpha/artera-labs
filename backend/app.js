const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const headers = require('./routes/basicheaders');

const env = require("dotenv").config().parsed;

//API Routes
const index = require('./routes/index');
const projects = require('./routes/projects');
const user = require('./routes/user');
const contribute = require('./routes/contribute');
const castVote = require('./routes/castVote');
const streamChange = require('./routes/streamChange');
const claims = require('./routes/claims');

app.use(cors());
app.use(express.json()); //used to parse JSON body

app.use(headers);

//Serve backend data to client
app.get('/', async(req,res) => {
  res.status(200).json({message:"Check"});
});

app.get("/test", index);
app.get("/stream", streamChange);
app.get("/user/:uid", user);
app.get("/projects", projects);
app.put("/cast", castVote);
app.put("/claims", claims);
app.put("/contribute", contribute);

const normalizePort = val => {
  var port = parseInt(val,10);

  if(isNaN(port)) {
    //name pipe
    return val;
  }

  if (port >=0){
    //port number
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || 4200); //process.env dyanmically  variables part of node features. Always used for listening on ports

app.set('port', port);

//create a server constant (with app express imports and used as an object in createServer() )
const server = http.createServer(app);
const addr = server.address();

const onListening = () => {
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  console.log("Listening on " + bind);
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " require elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
