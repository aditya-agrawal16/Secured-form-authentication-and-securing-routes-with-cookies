const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
const mongoURL =
  "mongodb+srv://project:Project123@cluster0.ar8rl.mongodb.net/<dbname>?retryWrites=true&w=majority";
const User = require("./models/user.model");
const verifyJWT = require("./verifyJWT");

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
mongoose
  .connect(mongoURL, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(`Error: ${err}`));

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.find({ username: username })
    .then((doc) => {
      if (doc.length > 0) {
        if (password === doc[0].password) {
          // console.log('success')
          jwt.sign(
            {
              data: {
                username: username,
              },
            },
            "secret",
            (err, token) => {
              if (err) {
                console.log(err);
                return res.status(503).send(new Error("error"));
              }
              return res.status(200).send(token);
            }
          );
        } else {
          res.status(400).send("invalidPass");
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send("Error");
    });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log("hii");
  const { firstname, lastname, username, password, mobileno } = req.body;

  const newUser = new User({
    firstname,
    lastname,
    username,
    password,
    mobileno,
  });

  newUser
    .save()
    .then((doc) => {
      res.send("User successfully created");
    })
    .catch((err) => {
      console.log(err);
      res.send("Failed");
    });
});

app.get("/getuser", verifyJWT, (req, res) => {
  res.send(req.authorizedUser.data.username);
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
