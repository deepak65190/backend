const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authModel } = require("../models/auth.models");

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {
  let { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        let newData = new authModel({ email, pass: secure_pass, name, age });
        await newData.save();
        res.send("registered successfull");
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  let { email, pass } = req.body;
  // const token = jwt.sign({ deepak:"student"  }, "masai", {
  //   //expiresIn: "1h",
  // });
  try {
    let user = await authModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        if (result) {
          const token = jwt.sign({userID: user[0]._id }, process.env.key ) ;
            res.send(token);
        } else {
          res.send("wrong credential");
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});
module.exports = {
  authRouter,
};
