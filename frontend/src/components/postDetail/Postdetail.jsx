import axios from 'axios';
import '../Home/Home.css';
import { toast } from 'react-toastify';
import './postDetail.css';
import { useNavigate } from 'react-router-dom';
const postDetail = ({ item,user, toggleDetails }) => {
  //toast funtions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = (msg) => {
    toast.success(msg); 
  };
  const navigate = useNavigate();
  console.log(item);
  const removePost = (postId) => {
    if (window.confirm('Do You really want to delete post?')) {
      axios
        .delete(
          `/deletepost/${postId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
        .then((result) => {
          console.log(result);
          toggleDetails();
          notifyB('Post delete successfully');
          navigate('/');
        })
        .catch((error) => {
          notifyA('Some thing is Wrong! please try again later.');
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="Home">
        <div className="showComments mt-2 d-flex justify-content-center">
          <div className="card mb-3 width">
            <button
              type="button"
              onClick={() => {
                toggleDetails();
              }}
              className="btn-close close"
              aria-label="Close"
            ></button>
            <div className="heding p-3">
              <img
                src={
                  user.Photo
                    ? user.Photo
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
                  alt="error"
                />
                <button
                  type="button"
                  className="btn btn-danger mt-2 w-100 d-flex justify-content-center align-items-center"
                  onClick={() => {
                    removePost(item._id);
                  }}
                >
                  Delete Post
                  <span className="material-symbols-outlined">delete</span>
                </button>
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
                         
                          <h5 className="card-title">
                            {comment.postedBy.username}
                          </h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text">{comment.comment}</p>
                        </div>
                      </div>
                     
                      );
                    })}
                  </p>
                </div>

              

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default postDetail;
