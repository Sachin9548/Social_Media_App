import express from "express";
import Postmodel from "../Models/posts.js";
import { requiredLogin } from "../middleWares/requiredLogin.js";

const router = express.Router();
   

router.get("/allposts", requiredLogin, (req, res) => {
  Postmodel.find()
    .populate("postedBy", "_id username firstname lastname Photo")
    .populate("comments.postedBy", "_id username firstname lastname")
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json(error);
    });   
});

router.post("/createPost", requiredLogin, (req, res) => {
  const { body, pic } = req.body;
  if (!pic || !body) {
    return res.status(401).json("please fill all details");
  }
  console.log(req.user);
  const postdata = new Postmodel({
    body,
    photo: pic,
    postedBy: req.user,
  });
  postdata
    .save()
    .then((result) => {
      return res.status(200).json({ postdata: result });
    })   
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.get("/myposts", requiredLogin, (req, res) => {
  Postmodel.find({ postedBy: req.user._id })
    .populate("postedBy", "_id username firstname lastname")
   .populate("comments.postedBy", "_id username firstname lastname")
    .then((myposts) => {
      return res.status(200).json(myposts);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json(error);
    });
});

router.put("/like", requiredLogin, (req, res) => {
  Postmodel.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    },
  ).populate("postedBy", "_id username firstname lastname Photo")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json(error);
    });
});

router.put("/unlike", requiredLogin, (req, res) => {
  Postmodel.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  ).populate("postedBy", "_id username firstname lastname Photo")
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json(error);
    });
});

router.put("/comment", requiredLogin, (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
  };
  Postmodel.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {    
      new: true,  
    }, 
  ) .populate("comments.postedBy", "_id username firstname lastname")
    .populate("postedBy", "_id username firstname lastname Photo")

    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);                      
      return res.status(401).json(error);
    });
});

//delete post
router.delete("/deletepost/:postId", requiredLogin, (req, res) =>{
  Postmodel.findOne({ _id:req.params.postId})
    .populate("postedBy", "_id")
    .then((post) => {
      if(post.postedBy._id.toString() === req.user._id.toString()){
        Postmodel.deleteOne({_id:req.params.postId})
          .then((result) => {
            return res.status(200).json(result);
          })
          .catch((error) => {
            console.log(error);
            return res.status(404).json(error);
          });
        
      }else{
        return res.status(401).json("you are not the owner of this post");
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json(error);
    });
})

//to show following
router.get("/myfollowingpost",requiredLogin,(req,res)=>{
  Postmodel.find({
    postedBy:{
      $in:req.user.following
    }
  })
  .populate("postedBy", "_id username firstname lastname Photo")
  .populate("comments.postedBy", "_id username firstname lastname")
  .then((result)=>{
    return res.status(200).json(result);
  }) 
  .catch((error)=>{   
    console.log(error);
    return res.status(401).json(error);
  })
})

export default router; 

    

