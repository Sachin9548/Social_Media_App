import mongoose from "mongoose";
import Usermodel from "../Models/module.js";
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
    // default: 'no photo',
  },
  likes: [
    {
      type: ObjectId,
      ref: "users",
    },
  ],
  comments: [
    { 
      comment: { type: String }, 
      postedBy: { type: ObjectId, ref: "users" } 
    },
  ],
  postedBy: {
    type: ObjectId,
    ref: Usermodel,
  },
});

const Postmodel = mongoose.model("posts", postSchema);
export default Postmodel;
