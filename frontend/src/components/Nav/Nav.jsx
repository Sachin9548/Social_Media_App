import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import "./Nav.css"
import { loginContext } from '../../context/loginContext';

const Nav = ({ login }) => {
  const navigate=useNavigate();
  const { setModalOpen } = useContext(loginContext);
  const loginStatus = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/createPost">
              Create Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/followingpost">
             My Following Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to={''}>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setModalOpen(true)}
              >
                Log Out
              </button>
            </Link>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li className="nav-item ">
            <Link
              className="nav-link active color-b"
              aria-current="page"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/signup">
              Sign Up
            </Link>
          </li>
        </>,
      ];
    }
  };

  
  const loginStatusMobile = () => {
    const token = localStorage.getItem('jwt');
    if (login || token) {
      return [
        <>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/">
              <span className="material-symbols-outlined">
              home
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/profile">
              <span className="material-symbols-outlined">
              account_circle
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/createPost">
              <span className="material-symbols-outlined">
              post_add
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/followingpost">
              <span className="material-symbols-outlined">
              post
              </span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to={''}>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => setModalOpen(true)}
              >
                <span className="material-symbols-outlined">
                logout
                </span>
              </button>
            </Link>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li className="nav-item ">
            <Link
              className="nav-link active color-b"
              aria-current="page"
              to="/login"
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link color-b" to="/signup">
              Sign Up
            </Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary box-s pc">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 curser" onClick={()=>{
            navigate("/")
          }}>Social Media App</span>
          <ul className="nav justify-content-end align-items-center">
            {loginStatus()}
          </ul>
          {/* <ul className="nav d-flex justify-content-between align-items-center mobile">
            {loginStatusMobile()}
          </ul> */}
        </div>
      </nav>

      
      <nav className="navbar bg-body-tertiary box-s mobile">
        <div className="container-fluid">
          <ul className="nav w-100 d-flex justify-content-between align-items-center">
            {loginStatusMobile()}
          </ul>
        </div>
      </nav>
      
    </>
  );
};

export default Nav;
