import { useEffect, useState } from 'react';
import './CreatePost.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { isAxiosError } from 'axios';
const CreatePost = () => {
  const [body, setbody] = useState('');
  const [image, setimage] = useState('');
  // const [url, seturl] = useState('');
  const navigate = useNavigate();

  //toast funtions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
  };

  const PostData = () => {
    // console.log('data', body, image);
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'instaclone');
    data.append('cloud_name', 'clouddatasachin');
    fetch('https://api.cloudinary.com/v1_1/clouddatasachin/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // seturl(data.url);
        sendToDb(data.url);
        // console.log(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
    // save post to mongodb

    const sendToDb = async (url) => {
      try {
        await axios
          .post(
            '/createPost',
            {
              body,
              pic: url,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
              },
            }
          )
          .then((result) => {
            console.log('create post', result);
            notifyB('Post Successfull');
            navigate('/');
          });
      } catch (error) {
        notifyA(error.response.data);
      }
    };
  };

  const loadfile = (event) => {
    let output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src);
    };
  };
  return (
    <>
      <div className="CreatePost">
        <div className="CreatePostContainer p-3 mt-3">
          <div className="PostHeader pb-2 d-flex justify-content-around">
            <h4>Create New Post</h4>
            <button
              type="button"
              onClick={PostData}
              className="btn btn-outline-info"
            >
              Share
            </button>
          </div>

          <img
            id="output"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDY2FLtB4EAwFMBWnij6QDUCtP28z7KYHdww&usqp=CAU"
            alt=""
          />

          <input
            className="p-3 border-bottom mb-2 border-dark w-100"
            type="file"
            accept="image/*"
            onChange={(event) => {
              loadfile(event);
              setimage(event.target.files[0]);
            }}
          />

          <div className="heding">
            {/* <img
              src="https://images.unsplash.com/photo-1440589473619-3cde28941638?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMGltZ3xlbnwwfHwwfHx8MA%3D%3D"
              className="card-img-top"
              alt="profile img"
            /> */}
            <h5 className="card-title p-2">
              {JSON.parse(localStorage.getItem('user')).username}
            </h5>
          </div>
          <textarea
            value={body}
            onChange={(e) => {
              setbody(e.target.value);
            }}
            className="w-100 p-2"
            placeholder="Add You Caption"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
