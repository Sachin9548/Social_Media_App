import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({ 
  firstname: {
    type: String,
    required: true,
  }, 
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Photo:{
    type:String,
  },
  follower:[
    {
      type: ObjectId,
      ref: "users",
    },
  ],
  following:[
    {  
      type: ObjectId,
      ref: "users",
    },
  ]
}); 
const Usermodel = mongoose.model("users", userSchema);
export default Usermodel;
