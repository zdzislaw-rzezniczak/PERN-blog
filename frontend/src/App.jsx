// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Authors from "./Pages/Authors.jsx";
import CreateAuthor from "./Pages/CreateAuthor.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import DeletePost from "./Pages/DeletePost.jsx";
import ErrorPage from "./Pages/ErrorPage.jsx";
import Login from "./Pages/Login.jsx";
import Logout from "./Pages/Logout.jsx";
import PostDetails from "./Pages/PostDetails.jsx";
import Register from "./Pages/Register.jsx";
import Posts from "./Pages/Posts.jsx";
import Navbar from "./Components/Navbar.jsx";


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