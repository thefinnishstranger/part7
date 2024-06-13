import { useDispatch, useSelector } from "react-redux";
import { handleFieldChange } from "../redux/reducers/formSlice";
import { Button } from "react-bootstrap";
import { clearBlogForm } from "../redux/reducers/formSlice";
import { useEffect } from "react";
import { setUser } from "../redux/reducers/authenticationReducer";
import blogService from "../services/blogService";

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()

  const { title, author, url } = useSelector(state => state.form.blog)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      console.log(user);
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const addBlogHandler = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title,
        author,
        url
      }
      await createBlog(newBlog)
      dispatch(clearBlogForm())
    } catch (error) {
      console.error('error creating blog', error)
    }
    
  };

  return (
    <div className="formDiv">
      <form onSubmit={addBlogHandler}>
        <h2>Create a new blog</h2>
        <p>
          title:{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => dispatch(handleFieldChange({ field: "title", value: e.target.value }))}
            placeholder="title of the blog"
          ></input>
        </p>
        <p>
          author:{" "}
          <input
            type="text"
            value={author}
            onChange={(e) => dispatch(handleFieldChange({ field: "author", value: e.target.value }))}
            placeholder="author of the blog"
          ></input>
        </p>
        <p>
          url:{" "}
          <input
            type="text"
            value={url}
            onChange={(e) => dispatch(handleFieldChange({ field: "url", value: e.target.value }))}
            placeholder="url of the blog"
          ></input>
        </p>
        <Button type="submit" variant="dark grey" className="create_button">create</Button>
      </form>
    </div>
  );
};

export default BlogForm;
