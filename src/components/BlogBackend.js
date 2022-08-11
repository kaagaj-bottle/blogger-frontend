import { useState } from "react";
import "./BlogBackend.css";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
const Blog = ({ blog, handleDeleteBtn }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [liked, setLiked] = useState(false);
  const handleLikeBtn = async (event) => {
    event.preventDefault();
    try {
      setLiked((prev) => !prev);
      setLikes((prevLikes) => {
        if (!liked) {
          return prevLikes + 1;
        } else {
          return prevLikes - 1;
        }
      });
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
