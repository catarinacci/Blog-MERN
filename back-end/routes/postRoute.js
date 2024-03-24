const express = require("express");
const { createPost, showPost, showSinglePost } = require("../controllers/postController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();

//blog routes
router.post('post/create', isAuthenticated, isAdmin, createPost)
router.get('post/show', showPost)
router.get('post/:id', showSinglePost)


module.exports = router;