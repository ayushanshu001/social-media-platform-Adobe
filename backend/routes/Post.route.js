const { Router } = require("express");
const { Postmodel } = require("../models/Post.model");

const postController = Router();

// Create a new post

postController.post("/posts", async (req, res) => {
  try {
    const Post = new Postmodel(req.body);
    await Post.save();
    res.status(201).send(Post);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// Retrieve a post by id

postController.get("/posts/:id", async (req, res) => {
  try {
    const getPost = await Postmodel.findById(req.params.id);
    if (getPost) {
      res.status(201).send(getPost);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// Update a post's content by id

postController.put("/posts/:id", async (req, res) => {
  try {
    const post = await Postmodel.findById(req.params.id);
    if (!post) {
      res.send("Post not found");
    }
    if (post) {
      post.content = req.body.content;
    }
    post.updated_at = new Date();
    await post.save();
    res.send(post);
  } catch (err) {
    console.log(error);
    res.status(404).json({ message: err.message });
  }
});

// Delete a post by id

postController.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Postmodel.findByIdAndDelete(req.params.id);
    if (!post) {
      ("Post not found");
    }
    res.send({ message: "Post deleted" });
  } catch (err) {
    console.log(error);
    res.status(404).json({ message: err.message });
  }
});

// Increment the like count of a post by id

postController.post("/posts/:id/like", async (req, res) => {
  try {
    const post = await Postmodel.findById(req.params.id);
    if (!post) {
      res.send("Post not found");
    } else {
      post.likes += 1;
    }
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

// Decrement the like count of a post by id. The count should not go below 0.

postController.post("/posts/:id/unlike", async (req, res) => {
  try {
    const post = await Postmodel.findById(req.params.id);
    if (!post) {
      res.send("Post not found");
    } else {
      post.likes = Math.max(post.likes - 1, 0);
    }
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = {
  postController,
};
