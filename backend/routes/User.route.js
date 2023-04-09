const { Router } = require("express");
const { Usermodel } = require("../models/User.model");

const userController = Router();

// Create a new user

userController.post("/users/", async (req, res) => {
  try {
    const userPost = new Usermodel(req.body);
    await userPost.save();
    res.status(201).send(userPost);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
});

// Retrieve a user by id

userController.get("/users/:id", async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id);
    if (user) {
      res.status(201).send(user);
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: error.message,
    });
  }
});

// Update a user's name or bio by id

userController.put("/users/:id", async (req, res) => {
  try {
    const user = await Usermodel.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
    } else if (user) {
      user.bio = req.body;
    }
    if (!user) {
      res.send("User not found");
    }
    user.updated_at = new Date();
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: error.message,
    });
  }
});

// Delete a User by id

userController.delete("/users/:id", async (req, res) => {
  try {
    const user = await Usermodel.findByIdAndDelete(req.params.id);
    if (user) {
      res.send({
        message: "User deleted",
      });
    } else {
      res.send({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: error.message });
  }
});

// Retrieve the total number of users

userController.get("/analytics/users", async (req, res) => {
  try {
    const count = await Usermodel.countDocuments();
    res.send({ count });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = {
  userController,
};
