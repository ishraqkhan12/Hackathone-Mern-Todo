import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";


const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/task/get-all-tasks`);
      setTasks(data.tasks); // Assuming response contains 'tasks'
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  // Filter tasks by status
  const toDoTasks = tasks.filter((task) => task.status === "To Do");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  const handleDelete = async (id)=>{
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/task/delete-task/${id}`);
      if (data){
        toast.success('Task deleted successfully')
        setTasks((prev) => prev.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full flex justify-between gap-4 px-4">
    {/* To Do Column */}
    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-500 mb-4 border-b-4 border-blue-500 pb-2">To Do</h2>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <div>
          {toDoTasks.length === 0 ? (
            <p className="text-gray-500">No tasks in To Do</p>
          ) : (
            toDoTasks.map((task) => (
              <div
                key={task._id}
                className="mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <div className="space-x-1">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  <Link to={`/home/update/${task._id}`}>
                  Edit </Link> 
                  </button>
                  <button onClick={()=> handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors">
                  
                  Delete 
                  </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Assigned to: {task.assignedTo || "Not Assigned"}</p>
                  <p>Created on: {new Date(task.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  
    {/* In Progress Column */}
    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-yellow-500 mb-4 border-b-4 border-yellow-500 pb-2">In Progress</h2>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <div>
          {inProgressTasks.length === 0 ? (
            <p className="text-gray-500">No tasks in In Progress</p>
          ) : (
            inProgressTasks.map((task) => (
              <div
                key={task._id}
                className="mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>

                  <div className="space-x-1">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  <Link to={`/home/update/${task._id}`}>
                  Edit </Link> 
                  </button>

                  <button onClick={()=> handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors">
                  
                  Delete 
                  </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Assigned to: {task.assignedTo || "Not Assigned"}</p>
                  <p>Created on: {new Date(task.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  
    {/* Done Column */}
    <div className="flex-1 bg-gray-100 p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-500 mb-4 border-b-4 border-green-500 pb-2">Done</h2>
      {loading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : (
        <div>
          {doneTasks.length === 0 ? (
            <p className="text-gray-500">No tasks in Done</p>
          ) : (
            doneTasks.map((task) => (
              <div
                key={task._id}
                className="mb-4 p-4 bg-white rounded-md shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <div className="space-x-1">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors">
                  <Link to={`/home/update/${task._id}`}>
                  Edit </Link> 
                  </button>
                  <button onClick={()=> handleDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors">
                  
                  Delete 
                  </button>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{task.description}</p>
                <div className="text-sm text-gray-500">
                  <p>Assigned to: {task.assignedTo || "Not Assigned"}</p>
                  <p>Created on: {new Date(task.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  </div>
  
  );
};

export default TaskBoard;
