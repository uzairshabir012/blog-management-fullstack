const blogModel = require("../models/blog.model");
const uploadFile = require("../services/coverImage.service");

async function createBlog(req, res) {
    try {
        const { title, content } = req.body;
        const file = req.file;

        let coverImageUrl = null;

        if (file) {
            const result = await uploadFile(file.buffer.toString("base64"));
            coverImageUrl = result.url;
        }

        const blog = await blogModel.create({
            title,
            content,
            coverImage: coverImageUrl,
            author: req.user.id
        });

        return res.status(201).json({
            message: "Blog created",
            blog: {
                id: blog._id,
                title: blog.title,
                content: blog.content,
                coverImage: blog.coverImage,
                author: blog.author
            }
        });

    } catch (err) {
        console.error("Create Blog Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getAllBlogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const blogs = await blogModel
            .find()
            .skip(skip)
            .limit(limit)
            .populate("author", "username email");

        return res.status(200).json({
            message: "All Blogs",
            blogs
        });

    } catch (err) {
        console.error("Get All Blogs Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getBlogById(req, res) {
    try {
        const blogId = req.params.id;

        const blog = await blogModel
            .findById(blogId)
            .populate("author", "username email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        return res.status(200).json({
            message: "Blog fetched successfully",
            blog
        });

    } catch (err) {
        console.error("Get Blog By ID Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function updateBlog(req, res) {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;
        const file = req.file;

        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to update this blog"
            });
        }

        let coverImageUrl = blog.coverImage;

        if (file) {
            const result = await uploadFile(file.buffer.toString("base64"));
            coverImageUrl = result.url;
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.coverImage = coverImageUrl;

        await blog.save();

        return res.status(200).json({
            message: "Blog updated successfully",
            blog
        });

    } catch (err) {
        console.error("Update Blog Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function deleteBlog(req, res) {
    try {
        const blogId = req.params.id;

        const blog = await blogModel.findById(blogId);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to Delete this Blog"
            });
        }

        await blogModel.findByIdAndDelete(blogId);

        return res.status(200).json({
            message: "Blog Deleted"
        });

    } catch (err) {
        console.error("Delete Blog Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function searchBlogs(req, res) {
    try {
        const query = req.query.query;

        const blogs = await blogModel.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } }
            ]
        }).populate("author", "username email");

        return res.status(200).json({
            message: "Search blogs",
            blogs
        });

    } catch (err) {
        console.error("Search Error:", err);

        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    searchBlogs
};