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

  const deleteBtnClicked = (event) => {
    event.preventDefault();
    if (window.confirm(`Do you wan to delete ${blog.title}?`)) {
      handleDeleteBtn(event, blog.id);
    }
  };
  return (
    <div className="blog">
      <div>
        title: {blog.title}
        <button onClick={deleteBtnClicked}>delete</button>
        <Togglable buttonLabel0="more" buttonLabel1="less">
          <p>author: {blog.author}</p>
          <p>
            likes:{blog.likes}
            <button onClick={handleLikeBtn}>like</button>
          </p>
          <p>content: {blog.url}</p>
        </Togglable>
      </div>
    </div>
  );
};

export default Blog;
