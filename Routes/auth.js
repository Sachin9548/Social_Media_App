import express from "express";
import Usermodel from "../Models/module.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../keys.js";
import { requiredLogin } from '../middleWares/requiredLogin.js';


const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(401).json("plese fill all details");
  }

  Usermodel.findOne({ $or: [{ email: email }, { username: username }] }).then(
    async (saveUser) => {
      if (saveUser) {
        return res
          .status(404)
          .json("User Already Exist with this email and username");
      }
      // console.log(saveUser)

      bcrypt.hash(password, 10).then(async (hashPassword) => {
        const newUser = new Usermodel({
          firstname,
          lastname,
          username,
          email,
          password: hashPassword,
        });
        try {
          const user = await newUser.save();
          // console.log(user);
          return res.status(200).json(user);
        } catch (error) {
          // console.log(error.message);
          return res.status(500).json(error);
        }
      });
    },
  );

  // console.log(req.body.name);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json("plese fill all details");
  }

  Usermodel.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(405).json("User Not Registed with this email");
    }
    // console.log(savedUser);

    bcrypt
      .compare(password, savedUser.password)
      .then((valid) => {
        if (valid) {
          const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
          // console.log(token);
          // return res.status(200).json({savedUser,token});
          return res.status(200).json({ savedUser, token });
        } else {
          return res.status(500).json("invalid password");
        }
      })
      .catch((error) => {
        return res.status(505).json(error);
      });
  });
});

export default router;
