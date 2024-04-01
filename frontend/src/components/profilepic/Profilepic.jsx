import React, { useEffect, useRef, useState } from 'react';
import './Profilepic.css';
import { toast } from 'react-toastify';

import axios from 'axios';
const Profilepic = ({ changeProfile }) => {
  const [image, setimage] = useState('');
  const [url, seturl] = useState('');
  const hiddenFile = useRef(null);

  //toast funtions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
  };

  const PostData = () => {
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
        seturl(data.url);
        // sendToDb(data.url);
        // console.log(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendToDb = async () => {
    try {
      await axios
        .put(
          '/uploadprofilepic',
          {
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
          console.log(result);
          changeProfile();
          notifyB('Profile pic Uploaded');
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      notifyA('someting error');
    }
  };

  const HandleClick = () => {
    hiddenFile.current.click();
  };

  useEffect(() => {
    if (image) {
      PostData();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      sendToDb();
    }
  }, [url]);

  return (
    <>
      <div className="Profilepic width mt-4">
        <div className="modal-dialog width">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Change Profile Pic
              </h1>
            </div>
            <div>
              <button
                onClick={HandleClick}
                className="mt-3 w-100 btn btn-outline-primary"
              >
                Upload Photo
              </button>
              <input
                ref={hiddenFile}
                onChange={(e) => {
                  setimage(e.target.files[0]);
                }}
                className="d-none"
                type="file"
                accept="image/*"
              />
            </div>
            <div>
              <button
                onClick={() => {
                  seturl(null);
                  sendToDb();
                }}
                className="mt-3 w-100 btn btn-outline-danger"
              >
                Remove Current Photo
              </button>
              <input className="d-none" type="file" accept="image/*" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn mt-4 btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  changeProfile();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepic;
