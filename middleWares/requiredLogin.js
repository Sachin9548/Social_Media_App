import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { jwt_secret } from "../keys.js";
import Usermodel from "../Models/module.js";

export const requiredLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("you must be login");
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, jwt_secret, (err, payload) => {
    if (err) {
      return res.status(401).json("you must be login2");
    }
    const { _id } = payload;
    Usermodel.findById(_id).then((user) => {
      // console.log(user);
      req.user = user;
      next();
    });
  });
};
