import { useEffect, useState } from 'react';
import './Profile.css';
import '../Home/Home.css';
import axios from 'axios';
import Postdetail from '../postDetail/Postdetail';
import { Link } from 'react-router-dom';
import Profilepic from '../profilepic/Profilepic';
const Profile = () => {
  const [pic, setpic] = useState([]);
  const [changepic, setchangePic] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setuser] = useState('');

  const toggleDetails = (posts) => {
    console.log('detail from profile posts', posts);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
      console.log('toggle item', item);
    }
  };
  const changeProfile = () => {
    if (changepic) {
      setchangePic(false);
    } else {
      setchangePic(true);
    }
  };
  useEffect(() => {
    axios
      .get(
        `/user/${
          JSON.parse(localStorage.getItem('user'))._id
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        let reversedPost = result.data.posts.slice().reverse();
        console.log(reversedPost);
        setpic(reversedPost);
        setuser(result.data.user);
        console.log('pic', pic);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="Profile m-3">
        {!changepic && (
          <div className="box">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span>Profile</span>
                <button className="btn btn-info">
                  <Link className="profile" to={`/`}>
                    Home
                  </Link>
                </button>
              </div>
              <div className="prof p-3">
                <img
                  onClick={() => {
                    changeProfile();
                  }}
                  src={
                    user.Photo
                      ? user.Photo
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&usqp=CAU'
                  }
                  alt="profile img"
                />
                <div className="card-body center">
                  <h5 className="card-title">
                    {JSON.parse(localStorage.getItem('user')).firstname}{' '}
                    {JSON.parse(localStorage.getItem('user')).lastname}
                  </h5>
                  <h6 className="card-title">
                    {JSON.parse(localStorage.getItem('user')).email}
                  </h6>
                  <p className="card-title">
                    {JSON.parse(localStorage.getItem('user')).username}
                  </p>
                  <div className="mt-2">
                    <span className="p-2">{pic ? pic.length : '0'} posts</span>
                    <span className="p-2">
                      {user.follower ? user.follower.length : '0'} followers
                    </span>
                    <span className="p-2">
                      {user.following ? user.following.length : '0'} following
                    </span>
                  </div>
                </div>
              </div>

              <hr />

              {!show && (
                <>
                  <div className="container4">
                    {pic.map((p) => {
                      return (
                        <div className="card cardWidth">
                          <img
                            src={p.photo}
                            className="card-img-top"
                            alt="..."
                          />
                          <div className="icons">
                            <span className="pt-2 material-symbols-outlined">
                              favorite
                            </span>
                            <h6>{p.likes.length} Like</h6>
                            <h6>{p.body}</h6>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              toggleDetails(p);
                            }}
                            className="btn btn-info mb-2"
                          >
                            Details
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {show && <Postdetail item={posts} user={user} toggleDetails={toggleDetails} />}
        {changepic && <Profilepic changeProfile={changeProfile} />}
      </div>
    </>
  );
};

export default Profile;
