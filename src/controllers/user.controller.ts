import { Request, Response } from "express";
import User from "../models/user.model";

export const createUsers = async (req: Request, res: Response) => {
  const { username, age, hobbies } = req.body;

  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Invalid or missing username" });
    return;
  }
  if (!age || typeof age !== "number") {
    res.status(400).json({ error: "Invalid or missing age" });
    return;
  }
  if (!Array.isArray(hobbies)) {
    res.status(400).json({ error: "Hobbies must be an array" });
    return;
  }

  try {
    const newUser = new User({ username, age, hobbies });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error creating users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    console.log(`Request served by Worker Process: ${process.pid}`);

    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId || Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "Invalid request data" });
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PATCH /users/:id/hobbies
export const updateHobbies = async (req: Request, res: Response) => {
  try {
      const { id } = req.params; // User ID
      const { hobby } = req.body; // New hobby to add

      // Find the user and update hobbies
      const user = await User.findById(id);
      if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      if (!user.hobbies.includes(hobby)) {
          user.hobbies.push(hobby); // Add the new hobby
          await user.save();
      }

      res.status(200).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating hobbies" });
  }
};

