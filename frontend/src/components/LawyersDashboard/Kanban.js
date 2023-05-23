import React, { useState } from "react";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });

  const [newTask, setNewTask] = useState("");

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTasks({
      ...tasks,
      toDo: [...tasks.toDo, newTask],
    });
    setNewTask("");
  };

  return (
    <div className="kanban-board">
      <div className="column">
        <h2>To Do</h2>
        <form onSubmit={handleFormSubmit}>
          <input type="text" value={newTask} onChange={handleInputChange} />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.toDo.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        <ul>
          {tasks.inProgress.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="column">
        <h2>Done</h2>
        <ul>
          {tasks.done.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KanbanBoard;
