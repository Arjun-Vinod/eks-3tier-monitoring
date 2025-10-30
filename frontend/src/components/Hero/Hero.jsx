import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import "./Hero.css";
import Header from "../Header/Header";
import CompletedTask from "../completedTask/completedTask";
import IncompleteTask from "../incompleteTask/incompleteTask";
const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleAddClick = () => {
    setShowForm(!showForm);
  };
  const handleCloseClick = () => {
    setShowForm(false);
    setEditTaskData(null);
  };

  useEffect(() => {
    axios
      .get("https://taskmanager-9a4k.onrender.com/api/task")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    // const newTaskData = {
    //   taskName: taskData.title, // Match field name with the API
    //   description: taskData.description,
    //   dueDate: taskData.dueDate,
    // };
    axios
      .post("https://taskmanager-9a4k.onrender.com/api/task", taskData)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskData({
          title: "",
          description: "",
          isCompleted: false,
          dueDate: "",
        }); 
        setShowForm(false);
      })
      
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const editTask = (e) => {
    e.preventDefault();
    if (!editTaskData) return;

    axios
      .put(`https://taskmanager-9a4k.onrender.com/api/task/${editTaskData._id}`, editTaskData)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === editTaskData._id ? response.data : task
        );
        setTasks(updatedTasks);
        setEditTaskData(null);
      })
      .catch((error) => {
        console.error("Error editing task:", error);
      });
  };
  const handleEditClick = (task) => {
    setEditTaskData(task);
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://taskmanager-9a4k.onrender.com/api/task/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const toggleTaskCompletion = (task) => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    axios
      .put(`https://taskmanager-9a4k.onrender.com/api/task/${task._id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((t) =>
          t._id === task._id ? response.data : t
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error updating task completion status:", error);
      });
  };

  return (
    <div className="Hero">
      <div className="left">
        <h1>Task Manager</h1>
        <button className="btn" onClick={handleAddClick}>
          Create
        </button>

        {showForm && (
          <div className="form-container">
            <button className="close-btn" onClick={handleCloseClick}>
              &times;
            </button>
            <form className="task-form">
              <h2>Add Task</h2>
              <label>
                Task Name:
                <input
                  type="text"
                  name="taskName"
                  value={taskData.title}
                  onChange={(e) =>
                    setTaskData({ ...taskData, title: e.target.value })
                  }
                />
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={taskData.description}
                  onChange={(e) =>
                    setTaskData({ ...taskData, description: e.target.value })
                  }
                ></textarea>
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={(e) =>
                    setTaskData({ ...taskData, dueDate: e.target.value })
                  }
                />
              </label>
              <button onClick={addTask} className="btn">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="right">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="task-heading">
                  <h1>All Tasks</h1>
                </div>
                <div className="tasks">
                  {tasks.length === 0 ? (
                    <div className="no-tasks-message">
                      <h2 className="message">No tasks yet?<br/><br/>Create your First Task Today.</h2>
                    </div>
                  ) : (
                    tasks
                      .slice()
                      .sort((a, b) => a.isCompleted - b.isCompleted)
                      .map((task) => (
                        <div key={task._id} className="task-items">
                          <div className="main-item">
                            <div>
                              <h3>Title: {task.title}</h3>
                              <p>Description: {task.description}</p>
                              <p>
                                Due Date:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <label>
                                Completed
                                <input
                                  className="check-box"
                                  type="checkbox"
                                  checked={task.isCompleted}
                                  onChange={() => toggleTaskCompletion(task)}
                                />
                              </label>
                            </div>
                          </div>
                          <div className="form-btns">
                            <button onClick={() => handleEditClick(task)}>
                              Edit
                            </button>
                            {editTaskData && editTaskData._id === task._id && (
                              <div className="editForm-container">
                                <button
                                  className="close-btn"
                                  onClick={handleCloseClick}
                                >
                                  &times;
                                </button>
                                <form className="edit-form" onSubmit={editTask}>
                                  <h2>Edit Task</h2>
                                  <label>
                                    Task Name:
                                    <input
                                      type="text"
                                      name="taskName"
                                      value={editTaskData.title}
                                      onChange={(e) =>
                                        setEditTaskData({
                                          ...editTaskData,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                  </label>
                                  <label>
                                    Description:
                                    <textarea
                                      name="description"
                                      value={editTaskData.description}
                                      onChange={(e) =>
                                        setEditTaskData({
                                          ...editTaskData,
                                          description: e.target.value,
                                        })
                                      }
                                    ></textarea>
                                  </label>
                                  <label>
                                    Due Date:
                                    <input
                                      type="date"
                                      name="dueDate"
                                      value={editTaskData.dueDate}
                                      onChange={(e) =>
                                        setEditTaskData({
                                          ...editTaskData,
                                          dueDate: e.target.value,
                                        })
                                      }
                                    />
                                  </label>
                                  <button type="submit" className="btn">
                                    Save
                                  </button>
                                </form>
                              </div>
                            )}
                            <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            }
          />
          <Route
            path="/completedtask"
            element={<CompletedTask tasks={tasks} />}
          />
          <Route
            path="/incompletetask"
            element={<IncompleteTask tasks={tasks} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Hero;
