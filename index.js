import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import data from './data.js';
import { mongourl } from './keys.js';
import auth from './Routes/auth.js';
import createPosts from './Routes/createPosts.js';
import user from './Routes/user.js';
import { fileURLToPath } from 'url';
import path from 'path';
   
const app = express();
 
app.use(express.json());
   
app.use(cors());

const ConnectDB = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log(`connected To DB`);
  } catch (error) {
    console.error(`not connected `);
    process.exit();
  }
};
ConnectDB();

app.use(auth);
app.use(createPosts);
app.use(user);
const PORT = process.env.port || 5000;

//serving the frountend

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./frontend/dist")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"),
              function (err){
                res.status(500).send(err)
              })
}) 

app.listen(PORT, (req, res) => {
  console.log(`server created ${PORT}`);
});
