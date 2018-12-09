import express from 'express';
import http from 'http';
import mongoose from 'mongoose';

//middlewares
import bodyParser from 'body-parser';
import morgan  from 'morgan';

import router from './router';

const app = express();
const port = 8080;

// allow cross origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//DB SET UP
// mongodb set up
// 1) apt-get install mongodb
// 2) sudo mkdir /data/db
// 3) sudo chown -R $USER /data/db
// 4) run mongod // to start the server
// 5) connect with following command at e-duc database
// to stop database 
// ps wuax | grep mongo
// sudo kill id
mongoose.connect('mongodb://localhost/e-duc')


//morgan logins requests at terminal
app.use(morgan('combined'));
//parse post body to json
app.use(bodyParser.json({type: '*/*'}));


router(app);

//Server Set Up
const server =  http.createServer(app);
server.listen(8080);
console.log('server listens on 8080')
