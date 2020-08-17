const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const socketioJwt = require('socketio-jwt');


require('dotenv').config();

process.env.TZ = 'America/Guayaquil'; // zona horaria de la app

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.set('view engine', 'ejs');

// public files
app.use(express.static('public'));


// use it before all route definitions
const swaggerDocument = JSON.parse(
  fs.readFileSync(`${__dirname}/src/swagger.json`, 'utf8')
);

mongoose.set('useCreateIndex', true);

// create a socket
const server = http.Server(app);
const io = socketio(server);


// add swagger doc route
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true
  })
  .then(() => {
    server.listen(PORT, '127.0.0.1' , () => {
      console.log(`Listening on ${PORT}`);
      console.log('object');
    });
  })
  .catch(e => {
    console.error(`error to trying connected to mongodb ${e}`);
  });

require('./src/routes')(app);
require('./src/io')(io);
