import React, { useState, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const PRIORITY_CLASSES = {
  Low: "bg-green-600",
  Medium: "bg-yellow-600",
  High: "bg-red-600",
};

const TaskTitle = ({ label, className }) => (
  <div className={`flex items-center justify-center rounded-md py-2 px-4 ${className} text-white`}>
    {label}
  </div>
);

const AddTask = ({ open, setOpen, createTask }) => {
  const [task, setTask] = useState({
    title: "",
    status: "todo",
    priority: "Low",
    team: "",
    date: "",
  });

  const handleSubmit = () => {
    if (task.title.trim() && task.date.trim()) {
      createTask({ ...task, id: Date.now() });
      setTask({ title: "", status: "todo", priority: "Low", team: "", date: "" });
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-96">
        <h3 className="text-lg font-semibold mb-4">Create Task</h3>
        <input
          type="text"
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          className="w-full mb-4 p-2 border rounded-md"
        >
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="w-full mb-4 p-2 border rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          placeholder="Team"
          value={task.team}
          onChange={(e) => setTask({ ...task, team: e.target.value })}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <input
          type="date"
          value={task.date}
          onChange={(e) => setTask({ ...task, date: e.target.value })}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const createTask = (task) => {
    setTaskList((prev) => [...prev, task]);
  };

  const deleteTask = (taskId) => {
    setTaskList((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          <IoMdAdd className="text-lg" />
          Create Task
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <TaskTitle label="To Do" className={TASK_TYPE.todo} />
        <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
        <TaskTitle label="Completed" className={TASK_TYPE.completed} />
      </div>

      <div className="flex flex-col gap-4">
        {taskList.map((task) => (
          <div
            key={task.id}
            className="border rounded-md p-4 w-full flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className={`mt-2 ${TASK_TYPE[task.status]} text-white px-2 py-1 rounded-md inline-block`}>
                {task.status}
              </p>
              <p className={`mt-2 ${PRIORITY_CLASSES[task.priority]} text-white px-2 py-1 rounded-md inline-block`}>
                Priority: {task.priority}
              </p>
              <p className="mt-2">Team: {task.team || "N/A"}</p>
              <p className="mt-2">Date: {task.date || "N/A"}</p>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <AddTask open={open} setOpen={setOpen} createTask={createTask} />
    </div>
  );
};

export default Tasks;
