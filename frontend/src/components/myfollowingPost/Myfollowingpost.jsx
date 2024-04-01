import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import '../Home/Home.css';
const Myfollowingpost = () => {
  const [data, setdata] = useState([]);
  const [item, setItem] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
     
  //toast funtions  
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg);
  };

  const navigate = useNavigate();
  useEffect(() => {
    // console.log("home page")
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/signup');
    }
    //fetch ing posts from db
    axios
      .get(
        '/myfollowingpost',
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        let reversedPost = result.data.slice().reverse();
        console.log('allposts foloe', reversedPost);
        setdata(reversedPost);
        // console.log(result);
      })
      .catch((error) => {
        console.log('allposts', error);
      });
  }, []);

  const likePost = (id) => {
    axios
      .put(
        '/like',
        {
          postId: id,
        },
        { 
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result.data._id) {
            return result.data;
          } else {
            return posts;
          }
        });
        setdata(newData);
        console.log('like', result);
      })
      .catch((error) => {
        console.log('like', error);
      });
  };
  const unLikePost = (id) => {
    axios
      .put(
        '/unlike',
        {
          postId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result.data._id) {
            return result.data;
          } else {
            return posts;
          }
        });
        setdata(newData);
        console.log('unlike', result);
      })
      .catch((error) => {
        console.log('unlike', error);
      });
  };

  // comments function

  const makeComment = (text, id) => {
    // console.log(comment);
    axios
      .put(
        '/comment',
        {
          text: text,
          postId: id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id == result.data._id) {
            return result.data;
          } else {
            return posts;
          }
        });
        setdata(newData);
        setComment('');
        notifyB('comment posted');
        console.log('make comment', result);
      })
      .catch((error) => {
        console.log('make comment', error);
        notifyA('error occours');
      });
  };

  //show comments page
  const toggleComments = (posts) => {
    console.log('toggle posts', posts);
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
      console.log('toggle follow item', item);
    }
  };

  return (
    <>
       <div className="Home">
        {show ? (
          <>
            <div className="showComments d-flex justify-content-center mt-3">
              <div className="card mb-3 width">
                <button
                  type="button"
                  onClick={() => {
                    toggleComments();
                  }}
                  className="btn-close close"
                  aria-label="Close"
                ></button>
                <div className="heding p-3">

                  <img
                   src={
                          item.postedBy.Photo
                            ? item.postedBy.Photo
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&usqp=CAU'
                        }
                    className="card-img-top"
                    alt="profile img"
                  />


                  <h5 className="card-title">
                    {item.postedBy.firstname} {item.postedBy.lastname}
                  </h5>
                </div>

                <div className="row g-0">
                  <div className="col-md-6 p-2">
                    <img
                      src={item.photo}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body ">
                      <div className="d-flex flex-column justify-content-around align-items-center">
                        <h6>{item.likes.length} Likes</h6>
                        <h6>{item.body}</h6>
                      </div>

                      <h5 className="card-title">Comments</h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          Letest Comments
                        </small>
                      </p>
                      <p className="card-text">
                        {item.comments.map((comment) => {
                          return (
                            <div className="card border-primary mb-3">
                              <div className="card-header d-flex justify-content-between align-items-center ">
                               
                                <h6 className="p-0">
                                  {comment.postedBy.username}
                                </h6>
                              </div>
                              <div className="p-2">
                                <p className="card-text">{comment.comment}</p>
                              </div>
                            </div>
                          );
                        })}
                      </p>
                    </div>

                    <div className="card-body newComments mb-2 d-flex p-2 pb-0 w-75">
                      <div className="input-group mb-3 comment">
                        <span className="material-symbols-outlined">mood</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="New Comment"
                          value={comment}
                          onChange={(e) => {
                            setComment(e.target.value);
                          }}
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                        <button
                          className="btn btn-info"
                          onClick={() => {
                            makeComment(comment, item._id);
                            toggleComments();
                          }}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {data.map((posts) => {
              return (
                <div className="card cardWidth">
                  <div className="heding">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src={
                          posts.postedBy.Photo
                            ? posts.postedBy.Photo
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdK_dnE_5cezDHypwWCPUwWlUQU0y4pwvyDA&usqp=CAU'
                        }
                        className="card-img-top"
                        alt="profile img"
                      />
                      <h5 className="card-title">{posts.postedBy.username}</h5>
                    </div>
                    <button className="btn btn-info m-4">
                      <Link
                        className="profile"
                        to={`/profile/${posts.postedBy._id}`}
                      >
                        Profile
                      </Link>
                    </button>
                  </div>
                  <img src={posts.photo} className="card-img-top" alt="..." />
                  <div className="icons">
                    {posts.likes.includes(
                      JSON.parse(localStorage.getItem('user'))._id
                    ) ? (
                      <span
                        className="pt-2 material-symbols-outlined material-symbols-outlined-red"
                        onClick={() => {
                          unLikePost(posts._id);
                        }}
                      >
                        favorite
                      </span>
                    ) : (
                      <span
                        className="pt-2 material-symbols-outlined"
                        onClick={() => {
                          likePost(posts._id);
                        }}
                      >
                        favorite
                      </span>
                    )}

                    <h6>{posts.likes.length} Likes</h6>
                    <h6>{posts.body}</h6>
                    <h6
                      className="View"
                      onClick={() => {
                        toggleComments(posts);
                      }}
                    >
                      View All Comments
                    </h6>
                  </div>
                  <div className="card-body p-2 pb-0">
                    <div className="input-group mb-3 comment">
                      <span className="material-symbols-outlined">mood</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          makeComment(comment, posts._id);
                        }}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Myfollowingpost;
