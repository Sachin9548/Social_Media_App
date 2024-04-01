import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { loginContext } from '../../context/loginContext';

const Login = () => {
  const { setUserLogin } = useContext(loginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //toast funtions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = () => {
    toast.success('User Login Sucessfully');
  };

  //email regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const postData = async () => {
    if (!emailRegex.test(email)) {
      notifyA('invalid email');
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        ' At least 8 characters - Must contain at least 1 uppercase letter, 1 lowercase letter, And 1 number- Can contain special characters'
      );
      return;
    }
    const user = {
      email: email,
      password: password,
    };
    // console.log(user);

    await axios
      .post(
        '/login',
        user
      )
      .then((data) => {
        if (data) {
          notifyB();
          // console.log(data.data)
          localStorage.setItem('jwt', data.data.token);
          const Userdata=data.data.savedUser;
          localStorage.setItem('user',JSON.stringify(Userdata));
          setUserLogin(true)
          navigate('/');
        }
        // console.log(`data ${data}`);
      })
      .catch((error) => {
        if (error) {
          notifyA(error.response.data);
        }
        // console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="body-signup">
        <div className="container-form-signin p-3">
          <form className="row g-3">
            <div className="mb-3 w-50">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            {/* <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Username
              </label>
              <input type="text" className="form-control" id="inputEmail4" />
            </div> */}

            <div className="mb-3 w-50">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="form-control"
                id="inputPassword4"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                postData();
              }}
              className="btn btn-success mt-3 w-30 m-auto"
            >
              Login
            </button>
          </form>
          <div className="redirect mt-4">
            <span>
              Create New Account
              <span>
                <Link className="btn btn-warning mx-2" to="/signup">
                  Sign Up
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
