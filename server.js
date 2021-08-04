const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");



const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
var isConnected = false;
const db = require("./app/models");
const Tutorial = db.tutorials;
console.log(db.url);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    isConnected = true;
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Elyadata application." });
});
app.get("/healthzLive", (req, res) => {
  try{
    Tutorial.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  } catch( err ){
    res.sendStatus(500);
  }

});
app.get("/healthzRead", (req, res) => {
  isConnected ? res.sendStatus(200) : res.sendStatus(500);
});


require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.PORT}.`);
});
