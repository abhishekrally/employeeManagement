import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import mongoose from "mongoose";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const create = async (req, res) => {
  try {
    const { name, email, role, ID, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ name, email, role, ID, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { ID, title, description, date, category, status, priority } = req.body;

    if (!ID || !title || !description || !date || !category || !status || !priority) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ ID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newTask = {
      id: new mongoose.Types.ObjectId(),
      title,
      description,
      date,
      category,
      status,
      priority,
    };
    const updatedUser = await User.findOneAndUpdate(
      { ID: ID },
      { $push: { tasks: newTask } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update user tasks." });
    }
    res.status(200).json({ message: "Task added successfully!", updatedUser });

  } catch (error) {
    console.error("❌ Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const fetchAllTasks = async (req, res) => {
  try {
    const users = await User.find({}, { tasks: 1, name: 1, ID: 1, _id: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete task by taskId
export const deleteTask = async (req, res) => {
  const { userID, taskID } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { ID: userID },
      { $pull: { tasks: { _id: taskID } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", user });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error while deleting task" });
  }
};

export const fetchTaskUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: "User ID is required" });
    const user = await User.findOne({ _id: id }, { ID: 1, name: 1, tasks: 1 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.tasks || []);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err.message });
  }
};

export const updatedTaskStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
