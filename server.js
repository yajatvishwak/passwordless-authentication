const express = require("express");
const morgan = require("morgan");
const app = express();
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

app.use(morgan("tiny"));
app.use(express.json());

// replace with a database
accounts = [];
loginAttempt = [];

// first register the user
app.post("/signup", (req, res) => {
  accounts.push({ email: req.body.email });
  res.send({ message: "success" });
});

// when the user enters the email this route is called
app.post("/identify", (req, res) => {
  const email = req.body.email;
  const account = accounts.find((item) => item.email === email);
  if (account) {
    const id = uuidv4();
    loginAttempt.push({ email: email, id: id });
    console.log(loginAttempt);
    //send link and verification id to user via mail here
  }
  res.send({ message: "success" });
});

// route that handles all the links sent in the mail
app.post("/verify", (req, res) => {
  const id = req.body.id;
  const account = loginAttempt.find((item) => item.id === id);
  if (account) {
    // authenticated
    const token = jwt.sign(account.email, "serversecret");
    res.send({ token });
  } else {
    res.status(401).json({ message: "Oops something went wrong" });
  }
});

app.listen(1231, () => {
  console.log("listening on 1231");
});
