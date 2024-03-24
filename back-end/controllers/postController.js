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
  const posts = Post.find()
    .sort({ createdAt: -1 })
    .populate("postedBy", "name");
  res.status(201).json({
    success: true,
    posts,
  });
  try {
  } catch (error) {
    next(error);
  }
};

//show single post
exports.showSinglePost = async (req, res, next) => {
  const posts = Post.findById(req.params.id).populate(
    "comments.postedBy",
    "name"
  );
  res.status(201).json({
    success: true,
    posts,
  });
  try {
  } catch (error) {
    next(error);
  }
};

//delete post
exports.deletePost = async (req, res, next) => {
  const currentPosts = Post.findById(req.params.id);

  const ImgId = currentPosts.image.public_id;
  if (ImgId) {
    await cloudinary.uploader.destroy(ImgId);
  }
  try {
    const post = await Post.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      messaage: "Post deleted",
    });
  } catch (error) {
    next(error);
  }
};

//update post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;
    const currentPosts = await Post.findById(req.params.id);

    //build object data
    const data = {
      title: title || currentPosts.title,
      content: content || currentPosts.content,
      image: image || currentPosts.image,
    };

    //modify post image conditionally
    if (req.body.image === "") {
      const ImgId = currentPosts.image.public_id;

      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "post",
        width: 1200,
        crop: "scale",
      });
      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const postUpdate = await Post.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      postUpdate,
    });
  } catch (error) {
    next(error);
  }
};

// add comment
exports.addComment = async(req, res, netx)=>{
  const {comment} = req.body;

  try {
    const post = Post.findByIdAndUpdate(req.params.id, {
      $push: {comments: {text:comment, postedBy: req.user._id}}
    },{new:true})

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error)
  }
}

// add like
exports.addLike = async(req, res, netx)=>{
  
  try {
    const post = Post.findByIdAndUpdate(req.params.id, {
      $addToSet: {likes: req.user._id} 
    },{new:true})

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error)
  }
}

// remove like
exports.removeLike = async(req, res, netx)=>{

  try {
    const post = Post.findByIdAndUpdate(req.params.id, {
      $pull: {likes: req.user._id} 
    },{new:true})

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    next(error)
  }
}