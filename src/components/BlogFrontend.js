import React from "react";
import "./BlogFrontend.css";
const BlogFrontend = ({ blog }) => {
  return (
    <div>
      <div className="blog--container">
        <div className="blog--title">{blog.title}</div>
        <div className="blog--content">{blog.url}</div>
        <div className="author--container">
          <div className="likes">Like:{blog.likes}</div>
          <div className="blog--author">Author: {blog.author}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogFrontend;
