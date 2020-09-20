const express = require("express");
const bodyParser = require("body-parser");
const { setMap } = require("./api/post");
const { getMap } = require('./api/get');

const PORT = (3000);
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.post("/map", (req, res, then) => {
  setMap(req)
    .then(function (data) {
        //console.log("DATA", data);
      res.send(data);
    });
});
app.get("/map", (req, res, then) => {
    getMap()
    .then(function (data) {
        console.log(data);
        res.send(data);
      });
})

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, '0.0.0.0', () => {
 console.log(`Server is listening on port: ${PORT}`);
});