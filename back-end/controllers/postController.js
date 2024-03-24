const cloudinary = require("../utils/cloudinary");
const Post = require("../models/postModel");
const ErrorResponse = require("../utils/errorResponse");

//create post
exports.createPost = async (req, res, next) => {
  const { title, content, postedBy, image, likes, comments } = req.body;

  try {
    //upload image in cloudinary
    const result = cloudinary.uploader.upload(image, {
      folder: "post",
      width: 1200,
      crop: "scale",
    });
    const post = await Post.create({
      title,
      content,
      postedBy: req.user._id,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//show post
exports.showPost = async (req, res, next) => {
  const posts = Post.find().sort({ createdAt: -1 }).populate("postedBy", "name");
    res.status(201).json({
        success:true,
        posts
    })
  try {
  } catch (error) {
    next(error)
  }
};

//show single post
exports.showSinglePost = async (req, res, next) => {
    const posts = Post.findById(req.params.id).populate("comments.postedBy", "name");
      res.status(201).json({
          success:true,
          posts
      })
    try {
    } catch (error) {
      next(error)
    }
  };