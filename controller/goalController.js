const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// const { default: mongoose } = require("mongoose");

const getGoal = asyncHandler(async (req, resp) => {
  const getList = await User.find();
  resp.status(200).json(getList);
});

const editGoal = asyncHandler(async(req,resp) => {
    const editList = await User.findById(req.params.id)
    resp.status(200).json(editList);
})

const putGoal = asyncHandler(async (req, resp) => {
  const updateUser = await User.findById(req.params.id);
  if (!updateUser) {
    resp.status(400);
    throw new Error("User Not Found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  resp.status(400);
  resp.json(updatedUser);
});

const postGoal = asyncHandler(async (req, resp) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.gender ||
    !req.body.phone ||
    !req.body.status
  ) {
    resp.status(400).json({ message: "please add a field" });
  }
  const postUser = await User.create({
    name: req.body.name,
    email: req.params.email,
    status: req.params.status,
    phone: req.params.phone,
    gender: req.params.gender,
  });
  console.log(postUser);
  resp.status(200).json(postUser);
  // resp.redirect("/")
});

const deleteGoal = asyncHandler(async (req, resp) => {
  const getList = await User.findById(req.params.id);
  if (!getList) {
    resp.status(400);
    throw new Error("User Not Found");
  } else {
    await getList.remove()
    resp.status(200).json(`Deleted User ${req.params.id}`);
  }
});

module.exports = { getGoal, putGoal, deleteGoal, postGoal ,editGoal};
