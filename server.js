const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('make-promises-safe').abort = true

//const app = express()
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
const server = app.listen(8080,'0.0.0.0', function () {
  //let host = server.address().address;
  let port = server.address().port;
  console.log("=============================");
  console.log(JSON.stringify(server.address()));
  console.log("App listening at port:", port); 
})