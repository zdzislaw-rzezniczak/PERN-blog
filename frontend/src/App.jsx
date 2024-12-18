// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Authors from "./pages/Authors.jsx";
import CreateAuthor from "./pages/CreateAuthor.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import DeletePost from "./pages/DeletePost.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Register from "./pages/Register.jsx";
import Posts from "./pages/Posts.jsx";
import Navbar from "./components/Navbar.jsx";
import {useState} from "react";


const App = () => {

    return (
      <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/create-author" element={<CreateAuthor />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/delete-post" element={<DeletePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/post-details" element={<PostDetails />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/register" element={<Register />} /><Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
  );
};

export default App;