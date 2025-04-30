import Task from "../models/taskModals.js";

// Task create karne ka controller
export const createTaskController = async (req, res) => {
  try {
    const { title, description, assignedTo, status } = req.body;

    switch (true) {
      case !title:
        return res.status(400).send({ message: "Title is required" });

      case !description:
        return res.status(400).send({ message: "Description is required" });

      // case !assignedTo:
      //   return res.status(400).send({ message: "AssignedTo is required" });

      case !status:
        return res.status(400).send({ message: "Status is required" });

      default:
        break;
    }

    // New task create kar rahe hain
    const newTask = new Task({
      title,
      description,
      assignedTo,
      status,
    });

    await newTask.save();
    res.status(201).send({
      success: true,
      message: "Tast Created successfully",
      newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while creating task",
      error,
    });
  }
};

export const getTasksController = async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find();

    if (!tasks) {
      return res.status(404).json({ message: "No tasks found." });
    }

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Update task
export const updateTaskController = async (req, res) => {
  const { taskId } = req.params; // Get taskId from the URL
  const { title, description, assignedTo, status } = req.body; // Get task details from request body

  try {
    // Find task by taskId and update it with the new data
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, assignedTo, status },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error });
  }
};

// single task
export const SingleTaskController = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// delete task
export const deleteTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully", task });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while deleting task",
    });
  }
};

