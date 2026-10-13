const express = require("express");
const multer = require("multer");
const { authAuthor } = require("../middleware/auth.middleware");
const blogController = require("../controllers/blog.controller");
const {
    createBlogValidationRules,
    updateBlogValidationRules
} = require("../middleware/validation.middleware");

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

// Get All Blogs
router.get("/", blogController.getAllBlogs);

// Search Blogs
router.get("/search", blogController.searchBlogs);

// Get Single Blog By ID
router.get("/:id", blogController.getBlogById);

// Create Blog
router.post(
    "/create-blog",
    authAuthor,
    upload.single("coverImage"),
    createBlogValidationRules,
    blogController.createBlog
);

// Update Blog
router.patch(
    "/:id",
    authAuthor,
    upload.single("coverImage"),
    updateBlogValidationRules,
    blogController.updateBlog
);

// Delete Blog
router.delete(
    "/:id",
    authAuthor,
    blogController.deleteBlog
);

module.exports = router;