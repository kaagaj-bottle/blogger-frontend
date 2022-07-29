import { useState } from "react";
import "./Blog.css";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
const Blog = ({ blog, handleDeleteBtn }) => {
  const [likes, setLikes] = useState(blog.likes);
  const handleLikeBtn = async (event) => {
    event.preventDefault();
    try {
      setLikes((prevLikes) => prevLikes + 1);
      blog.likes = likes;
      await blogService.update(blog.id, blog);
      return;
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <div className="blog">
      <div>
        title: {blog.title}
        <button onClick={(event) => handleDeleteBtn(event, blog.id)}>
          delete
        </button>
        <Togglable buttonLabel0="more" buttonLabel1="less">
          <p>author: {blog.author}</p>
          <p>
            likes:{blog.likes}
            <button onClick={handleLikeBtn}>like</button>
          </p>
          <p>url: {blog.url}</p>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
