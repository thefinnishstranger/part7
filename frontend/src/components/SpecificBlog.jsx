import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogService";
import { setBlogs } from "../redux/reducers/blogsReducer";
import { removeBlog } from "../redux/reducers/blogsReducer";
import Blog from "./Blog";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/reducers/authenticationReducer";

const SpecificBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs);
    const specificBlog = useSelector(state => state.blogs.find(blog => blog.id === id));
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const fetchedBlogs = await blogService.fetchBlogs();
                dispatch(setBlogs(fetchedBlogs));
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

    const handleLike = async (blogId) => {
        try {
            const selectedBlog = await blogService.fetchParticularBlog(blogId);
            const updatedBlog = { ...selectedBlog, likes: selectedBlog.likes + 1 };
            const response = await blogService.update(blogId, updatedBlog);
            dispatch(setBlogs(blogs.map(blog => (blog.id === blogId ? response : blog))));
        } catch (exception) {
            console.error('Error while updating like', exception);
        }
    };

    const handleDelete = async (blogId) => {
        try {
            const selectedBlog = await blogService.fetchParticularBlog(blogId);
            const confirmed = window.confirm(`Are you sure you want to delete ${selectedBlog.title}`);
            if (confirmed) {
                await blogService.deleteBlog(blogId);
                dispatch(removeBlog(blogId));
                dispatch(setBlogs(blogs.filter(blog => blog.id !== blogId)));
                navigate('/blogs')
            }
        } catch (exception) {
            console.error('Error while deleting blog', exception);
        }
    };

    return (
        <div className="container mt-4">
            {specificBlog && (
                <Blog
                    key={specificBlog.id}
                    blog={specificBlog} // Passing the entire blog object
                    handleDelete={() => handleDelete(specificBlog.id)}
                    handleLike={() => handleLike(specificBlog.id)}
                />
            )}
            <div>
                <Comment />
            </div>
        </div>
    );
};

export default SpecificBlog;
