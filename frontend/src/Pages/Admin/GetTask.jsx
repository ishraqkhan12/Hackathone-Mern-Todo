import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from '../../components/navbar'

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/task/get-all-tasks`);
        setTasks(data.tasks); // Assuming response contains 'tasks'
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {tasks.map((task) => (
        <div key={task._id} className="max-w-sm bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="mt-2">
            <span className="font-medium text-blue-600">Assigned To: </span>
            <span className="text-gray-800">{task.assignedTo}</span>
          </div>
          <div className="mt-4">
            <span className={`inline-block text-sm px-3 py-1 rounded-full ${
              task.status === "To Do" ? "bg-gray-200" :
              task.status === "In Progress" ? "bg-yellow-200" :
              "bg-green-200"}`}>
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default TaskList;
