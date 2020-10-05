const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;
const mongoURL =
  "mongodb+srv://project:Project123@cluster0.ar8rl.mongodb.net/<dbname>?retryWrites=true&w=majority";
const User = require("./models/user.model");

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

app.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    user: {
      name: "xD",
    },
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
