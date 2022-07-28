import "./Blog.css";

const Blog = ({ blog }) => (
  <div className="blog">
    <p>title: {blog.title}</p>
    <p>author: {blog.author}</p>
  </div>
);

export default Blog;
