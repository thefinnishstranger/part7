import { Button } from "react-bootstrap";
import Togglable from "./Togglable";

const Blog = ({ blog, handleDelete, handleLike }) => {

  const handleLikeClick = () => {
    handleLike()
  }

  const handleDeleteClick = () => {
    handleDelete()
  }

  return (
    <div className="blogBlock">
      <p className="blogTitle">
        Title of the blog:{" "}
        <b>
          <i>{blog.title}</i>
        </b>
      </p>
      <p className="blogAuthor">
        Author of the blog:{" "}
        <b>
          <i>{blog.author}</i>
        </b>
      </p>
      <Togglable buttonLabel="view">
        <p className="blogUrl">
          Url:{" "}
          <b>
            <i>{blog.url}</i>
          </b>
        </p>
        <p className="blogLikes">
          Likes:{" "}
          <b>
            <i>{blog.likes}</i>
          </b>
        </p>
        <Button onClick={handleLikeClick} id="like_button" variant="dark grey">like</Button>
        <Button onClick={handleDeleteClick} id="delete_button" variant="dark grey">delete</Button>
      </Togglable>
    </div>
  );
}

export default Blog;
