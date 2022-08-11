import { useState, useEffect, useRef } from "react";
import BlogBackend from "./components/BlogBackend";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Home from "./components/Home";
import "./index.css";

const App = () => {
  const [userBlogs, setUserBlogs] = useState([]);
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
    if (user !== null) {
      blogService
        .getUserBlogs(user.username)
        .then((returnedUserBlogs) => {
          setUserBlogs(returnedUserBlogs);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    blogService.getAll().then((returnedBlogs) => {
      setBlogs(returnedBlogs).catch((err) => {
        console.log(err);
      });
    }, []);
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
  const handleDeleteBtn = async (event, id) => {
    event.preventDefault();

    try {
      const responseObj = await blogService.remove(id);

      setBlogs((prevBlogs) => {
        return prevBlogs.filter((blog) => blog.id !== id);
      });
    } catch (exception) {
      window.alert(`can't delete as this blog was not created by you`);
      console.log(exception);
    }
  };
  const condRendering = () => {
    if (user === null) {
      return (
        <>
          <Home
            handleChange={handleChange}
            handleLogin={handleLogin}
            username={username}
            password={password}
            blogs={blogs}
          />
          {/* <Togglable buttonLabel0="log in" buttonLabel1="cancel">
            <LoginForm
              handleLogin={handleLogin}
              handleChange={handleChange}
              username={username}
              password={password}
            />
          </Togglable> */}
        </>
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
        {userBlogs.map((blog) => (
          <BlogBackend
            key={blog.id}
            blog={blog}
            handleDeleteBtn={handleDeleteBtn}
          />
        ))}
      </div>
    );
  };
  return <>{condRendering()}</>;
};

export default App;
