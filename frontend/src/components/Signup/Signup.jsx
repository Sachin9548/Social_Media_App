import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./Signup.css"
const Signup = () => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  //toast funtions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifyB = () => {
    toast.success('User Register Sucessfully');
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
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      username: username,
    };
    // console.log(user);

    await axios
      .post(
        '/signup',
        user
      )
      .then((data) => {
        if (data) {
          notifyB();
          navigate('/login');
        }
        // console.log(`data ${data}`);
      })
      .catch((error) => {
        if (error) {
          notifyA(error.response.data);
        }
      });
  };

  return (
    <>
      <div className="body-signup">
        <div className="container-form-signin p-3">
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="first" className="form-label">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                className="form-control"
                id="first"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="last" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                className="form-control"
                id="last"
              />
            </div>

            <div className="mb-3">
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
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="form-control"
                id="username"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword5" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="inputPassword5"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                required
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Accept the term and Conditions
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                postData();
              }}
              className="btn btn-success w-50 m-auto"
            >
              Sign Up
            </button>
          </form>
          <div className="redirect mt-4">
            <span>
              Already have Account
              <span>
                <Link className="btn btn-warning mx-2" to="/login">
                  Login
                </Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
