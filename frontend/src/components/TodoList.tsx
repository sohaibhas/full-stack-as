"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">To-Do List</h2>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add a New Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 w-[400px] rounded"
        />
        <button
          onClick={handleTask}
          className="border p-2 rounded-md hover:bg-blue-700 hover:text-white"
        >
          Add Task
        </button>
      </div>
      <div>
        <h1>Tasks To-Do</h1>
        <div className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <li className="list-none border bg-gray-500 text-white p-2 w-[500px] overflow-y-auto">
              {task}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
