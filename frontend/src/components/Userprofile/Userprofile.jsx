import { useEffect, useState } from 'react';
import '../Home/Home.css';
import '../Profile/Profile.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const Userprofile = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  // follow user

  const followUser = (userId) => {
    axios
      .put(
        `/follow`,
        {
          followId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        console.log('follow result', result);
        setIsFollow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //unfollow user
  const unfollowUser = (userId) => {
    axios
      .put(
        `/unfollow`,
        {
          followId: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        console.log('follow result', result);
        setIsFollow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(userId)

  useEffect(() => {
    axios
      .get(
        `/user/${userId}`
      )
      .then((result) => {
        console.log(result);
        let reversedPost = result.data.posts.slice().reverse();
        console.log('posts', reversedPost);
        setUser(result.data.user);
        console.log('user data', result.data.user);
        setPosts(reversedPost);
        if (
          result.data.user.follower.includes(
            JSON.parse(localStorage.getItem('user'))._id
          )
        ) {
          setIsFollow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFollow]);

  return (
    <>
      <div className="Profile m-3"> 
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
                src={
                  user.Photo
                    ? user.Photo
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&usqp=CAU'
                }
                alt="profile img"
              />
              <div className="card-body center">
                <h5 className="card-title">
                  {user.firstname} {user.lastname}
                </h5>
                <h6 className="card-title">{user.email}</h6>
                <p className="card-title">{user.username}</p>
                <div className="mt-2">
                  <span className="p-2">{posts.length} posts</span>
                  <span className="p-2">
                    {user.follower ? user.follower.length : '0'} followers
                  </span>
                  <span className="p-2">
                    {user.following ? user.following.length : '0'} following
                  </span>
                  <button
                    className="btn btn-outline-primary m-4"
                    onClick={() => {
                      if (isFollow) {
                        unfollowUser(user._id);
                      } else {
                        followUser(user._id);
                      }
                    }}
                  >
                    {isFollow ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="container4">
              {posts.map((p) => {
                return (
                  <div className="card cardWidth p-2">
                    <img src={p.photo} className="card-img-top" alt="..." />
                    <div className="icons">
                      {/* <span className="pt-2 material-symbols-outlined">
                        favorite
                      </span> */}
                      <h6 className="pt-2">{p.likes.length} Like</h6>
                      <h6>{p.body}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userprofile;
