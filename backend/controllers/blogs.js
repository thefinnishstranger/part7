const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");
const Comment = require("../models/comment")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("comments", { content: 1 })
  .populate("userId", {
    username: 1,
    name: 1,
  })
  
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const token = request.token;
    const blogId = request.params.id;

    if (!token) {
      return response.status(401).json({ error: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.userId.toString() !== user._id.toString()) {
      return response.status(403).json({ error: "Unauthorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    response.status(204).end();
  } catch (error) {
    console.error("Error deleting blog:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  console.log(request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "User not found" });
  }

  if (!body.title || body.title.trim() === "") {
    return response.status(400).json({ error: "Title is missing or empty" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    userId: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });

  if (result) {
    response.json(result);
    response.status(200).end();
  } else {
    response.status(404).end();
  }
});

module.exports = blogsRouter;
