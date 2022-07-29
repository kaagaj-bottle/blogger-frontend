import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogObject, setBlogObject] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const blogRef = useRef();
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(newUser));

      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    if (name === "Username") {
      setUsername(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  const handleBlogData = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setBlogObject((prevBlogObject) => {
      return { ...prevBlogObject, [name]: value };
    });
  };
  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs((prevBlogs) => prevBlogs.concat(returnedBlog));
      setBlogObject({
        title: "",
        author: "",
        url: "",
      });
      blogRef.current.toggleVisibility();
    } catch (exception) {
      console.log(exception);
    }
  };
  // const handleDeleteBtn = async (event, id) => {
  //   event.preventDefault();
  //   setBlogs((prevBlogs) => {
  //     return prevBlogs.filter((blog) => blog.is !== id);
  //   });
  //   try {
  //     await blogService.remove(id);
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // };
  const condRendering = () => {
    if (user === null) {
      return (
        <Togglable buttonLabel0="log in" buttonLabel1="cancel">
          <LoginForm
            handleLogin={handleLogin}
            handleChange={handleChange}
            username={username}
            password={password}
          />
        </Togglable>
      );
    }

    return (
      <div>
        <h3>
          {user.name} is logged in
          <button
            onClick={(event) => {
              event.preventDefault();
              window.localStorage.removeItem("loggedUser");
              window.location.reload();
            }}
          >
            logout
          </button>
        </h3>
        <Togglable buttonLabel0="new blog" buttonLabel1="cancel" ref={blogRef}>
          <BlogForm
            handleBlogCreation={handleBlogCreation}
            handleBlogData={handleBlogData}
            title={blogObject.title}
            author={blogObject.author}
            url={blogObject.url}
          />
        </Togglable>
        <br />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };
  return <>{condRendering()}</>;
};

export default App;
