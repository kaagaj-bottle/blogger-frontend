import "./Home.css";
import Togglable from "./Togglable";
import LoginForm from "./LoginForm";
import { useState, useEffect } from "react";
import BlogFrontend from "./BlogFrontend";
import { nanoid } from "nanoid";
import blogService from "../services/blogs";
const Home = ({ handleLogin, handleChange, username, password }) => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const handleLoginClick = (event) => {
    event.preventDefault();
    setShowLoginForm((prev) => !prev);
  };
  const formattedBlogs = () => {
    return blogs.map((blog) => <BlogFrontend key={nanoid()} blog={blog} />);
  };
  return (
    <>
      <div className="nav--container">
        <div className="navbar">
          <div className="nav--text">Blogger</div>
          <button className="login--button" onClick={handleLoginClick}>
            Log In
          </button>
        </div>
      </div>
      <div>
        {showLoginForm && (
          <LoginForm
            handleLogin={handleLogin}
            handleChange={handleChange}
            username={username}
            password={password}
          />
        )}
      </div>
      {!showLoginForm && formattedBlogs()}
    </>
  );
};

export default Home;
