import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx"; // Import the useAuth hook

const AddTaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [auth] = useAuth(); // Get the user data from AuthContext
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!auth.user) {
        toast.error("User not authenticated");
        return;
      }

      const taskData = {
        ...form,
        assignedTo: auth.user.name, // Automatically assign the logged-in user's name
      };

      
      
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/task/create-task`,
        taskData
      );

      if (data?.success) {
        toast.success("Task Created Successfully!");
        setForm({
          title: "",
          description: "",
          status: "To Do",
        });
        navigate("/home"); // Redirect to tasks page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
    
      toast.error(error?.response?.data?.message || "Task creation failed");
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Create Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Task Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskForm;
