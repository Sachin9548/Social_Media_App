import express from "express";
import Postmodel from "../Models/posts.js";
import Usermodel from "../Models/module.js";
import { requiredLogin } from "../middleWares/requiredLogin.js";

const router = express.Router();

router.get("/user/:id", (req, res) => {
  Usermodel.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      if (user) {
        // return res.status(200).json(user);
        // Postmodel.find({ postedBy: user._id})
        Postmodel.find({ postedBy: req.params.id })
          .populate("postedBy", "_id username firstname lastname")
          .then((posts) => {
            return res.status(200).json({ user, posts });
          })
          .catch((error) => {
            return res.status(500).json(error);
          });
      } else {
        return res.status(404).json("user not found");
      }
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.put("/follow", requiredLogin, (req, res) => {
  Usermodel.findByIdAndUpdate(
    req.body.followId,
    {
      $push: {
        follower: req.user._id,
      },
    },
    {
      new: true,
    },
  ).then((result)=>{
    Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          following: req.body.followId,
        },
      },
      {
        new: true,
      },
    ).then((result) => {
      return res.status(200).json(result);
    }).catch((error) => {
      return res.status(500).json(error);
    })
    
  }).catch((error)=>{
    return res.status(500).json(error);
  })
});

router.put("/unfollow", requiredLogin, (req, res) => {
 Usermodel.findByIdAndUpdate(
    req.body.followId,
    {
      $pull: {
        follower: req.user._id,
      },
    },
    {
      new: true,
    },
  ).then((result)=>{
    Usermodel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          following: req.body.followId,
        },
      },
      {
        new: true,
      },
    ).then((result) => {
      return res.status(200).json(result);
    }).catch((error) => {
      return res.status(500).json(error);
    })

  }).catch((error)=>{
    return res.status(500).json(error);
  })
});

//upload profile pic

router.put("/uploadprofilepic", requiredLogin, (req, res) =>{
  Usermodel.findByIdAndUpdate(req.user._id,{
      $set:{Photo: req.body.pic}
    },{
      new:true
    }).then((user)=>{
    return res.status(200).json(user);
  }).catch((error)=>{
    return res.status(500).json(error);
  })
  
})

export default router;