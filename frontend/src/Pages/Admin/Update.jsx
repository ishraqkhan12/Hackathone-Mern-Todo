import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth.jsx";

const UpdateTaskForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const { taskId } = useParams(); 
  const [auth] = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/task/single-task/${taskId}`
        );
        if (data?.task) {
          setForm({
            title: data.task.title,
            description: data.task.description,
            status: data.task.status,
          });
        }
      } catch (error) {
        console.log(error);
        
  
        toast.error("Error fetching task details");
      }
    };
    fetchTask();
  }, [taskId]);

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

      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/task/update-task/${taskId}`,
        taskData
      );

      if (data) {
        toast.success("Task Updated Successfully!");
        navigate("/home"); // Redirect to tasks page after successful update
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      
      toast.error(error?.response?.data?.message || "Task update failed");
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-conso-500"
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
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskForm;
