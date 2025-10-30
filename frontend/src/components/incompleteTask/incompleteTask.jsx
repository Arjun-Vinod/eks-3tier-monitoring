import React from "react";
const IncompleteTask = ({ tasks }) => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div>
      <div className="main-heading">
        <h1>Incomplete Tasks</h1>
      </div>
      {incompleteTasks.length > 0 ? (
        <div className="tasks">
          {incompleteTasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3>Title: {task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="message">No tasks are incomplete yet.</p>
      )}
    </div>
  );
};

export default IncompleteTask;
