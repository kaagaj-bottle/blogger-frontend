import "./Blog.css";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
const Blog = ({ blog }) => {
  const handleLikeBtn = async (event) => {
    event.preventDefault();
  };

  const handleDeleteBtn = async (event) => {
    event.preventDefault();
    try {
      await blogService.remove(blog.id);
    } catch (exception) {
      console.log(exception);
    }
  };
  return (
    <div className="blog">
      <div>
        title: {blog.title}
        <button onClick={handleDeleteBtn}>delete</button>
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
