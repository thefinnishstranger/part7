const commentsRouter = require("express").Router();
const Comment = require('../models/comment')
const Blog = require("../models/blog")

commentsRouter.get("/:id/comments", async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        const comments = await blog.populate("comments")
        response.json(blog.comments)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
});

commentsRouter.post("/:id/comments", async (request, response) => {
    try {
        const { content } = request.body
        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(404).json({ error: 'blog has not beeen found' })
        }

        const comment = new Comment({
            content
          });
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()

        response.status(201).json(savedComment.toJSON())
    } catch (error) {
        response.status(400).json({ error: error.message })
    }
});

module.exports = commentsRouter
