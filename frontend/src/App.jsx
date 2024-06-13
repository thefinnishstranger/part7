import { useEffect, useRef } from "react";
import "./App.css";
import "./index.css"
import blogService from "./services/blogService";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Footer from "./components/Footer";
import { setBlogs, addBlog as addBlogAction, removeBlog } from "./redux/reducers/blogsReducer";
import { useSelector, useDispatch } from "react-redux";
import { login as loginAction, logout as logoutAction } from "./redux/reducers/authenticationReducer";
import { setUser, clearUser } from "./redux/reducers/authenticationReducer";
import { setLoginVisible } from "./redux/reducers/formSlice";
import { Button } from "react-bootstrap";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.authentication.user);
  const error = useSelector((state) => state.authentication.error);
  const loginVisible = useSelector((state) => state.form.visibility.loginVisible);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.fetchBlogs();
        dispatch(setBlogs(blogs));
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      console.log(user);
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    console.log('login with', { username, password });
    dispatch(loginAction({ username, password }));

  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={() => dispatch(setLoginVisible(true))} variant="dark grey">log in</Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleSubmit={handleLogin} />
          <Button onClick={() => dispatch(setLoginVisible(false))} variant="dark grey">cancel</Button>
        </div>
      </div>
    );
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logoutAction());
    blogService.setToken(null);
  };


  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const savedBlog = await blogService.create(blogObject);
      dispatch(addBlogAction(savedBlog));
    } catch (exception) {
      console.error("Can't create blog", exception);
    }
  };

  return (
      <div>
      <h2 className="blogs_text">Blogs</h2>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <Button onClick={handleLogout} variant="dark grey" className="logout_button">logout</Button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
