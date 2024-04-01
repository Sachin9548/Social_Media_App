import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import CreatePost from './components/CreatePost/CreatePost';
import Modal from './components/Modals/Modal';
import Userprofile from './components/Userprofile/Userprofile';
import Myfollowingpost from './components/myfollowingPost/Myfollowingpost';
import { loginContext } from './context/loginContext';
function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <loginContext.Provider value={{ setUserLogin, setModalOpen }}>
            <Nav login={userLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/followingpost" element={<Myfollowingpost />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/profile/:userId" element={<Userprofile />} />
            </Routes>

            <ToastContainer theme="dark" />
            {modalOpen && <Modal></Modal>}
          </loginContext.Provider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
