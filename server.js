/* *****************************************************************************
 *  Name:    Una Rúnarsdóttir
 *
 *  Description:   Creates the express connetion and creates the server. 
 *                 App listener. 
 *
 *  Written:       9/12/2020
 *  Last updated:  3/1/2021
 *
 *
 **************************************************************************** */
const express = require('express');
const app = express();
const env = require('./app/config/env.js');
const bodyParser = require('body-parser')
require('make-promises-safe').abort = true
app.use(bodyParser.json())
 
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

global.__basedir = __dirname;
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: false }');
}); 
 
let router = require('./app/routers/file.router.js');
app.use('/', router);
 
// Create a Server
let port = process.env.PORT || 8080;
const server = app.listen(/*5432,'0.0.0.0',*/ port , '0.0.0.0',function () {
  let host = server.address().address;
  let port = server.address().port;
})