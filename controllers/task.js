import ErrorHandler from "../middleware/error.js";
import { taskModel } from "../model/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await taskModel.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const task = await taskModel.find({ user: userId });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await taskModel.findById(id);

    // if task not found next will use error handler middleware defined in app.js
    if (!task) return next(new ErrorHandler("Task not exist", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await taskModel.findById(id);

    // if task not found next will use error handler middleware defined in app.js
    if (!task) return next(new ErrorHandler("Task not exist", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
