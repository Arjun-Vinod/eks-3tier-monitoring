import React from "react";
import "./completedTask.css";
const CompletedTask = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);

  return (
    <div>
      <div className="main-heading">
        <h1>Completed Tasks</h1>
      </div>
      {completedTasks.length > 0 ? (
        <div className="tasks">
          {completedTasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>Title: {task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="message">No tasks completed yet.</p>
      )}
    </div>
  );
};

export default CompletedTask;
