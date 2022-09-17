import React from "react";
import { useState } from "react";
import "./TodoList.css";
import "./FontLibrary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodoList() {
  let [task, setTask] = useState("");
  let [taskList, setTaskList] = useState([]);
  let [taskID, setTakId] = useState(0);

  let handleSubmit = (event) => {
    event.preventDefault();
    if (taskID) {
      let taskToEdit = taskList.find((i) => i.id === taskID);
      let updateTasks = taskList.map((t) =>
        t.id === taskToEdit.id
          ? (t = { id: t.id, task })
          : { id: t.id, task: t.task }
      );
      setTaskList(updateTasks);
      setTakId(0);
      setTask("");
      return;
    }

    if (task !== "") {
      setTaskList([
        {
          id: `${Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)}`,
          task: task,
        },
        ...taskList,
      ]);
      setTask("");
    }
  };

  // this is for deleting the task in the list
  let handeleDelete = (id) => {
    let deleteTask = taskList.filter((task) => task.id !== id);
    setTaskList([...deleteTask]);
  };
  console.log(taskList);

  let handelEdit = (id) => {
    let editTasks = taskList.find((tasks) => tasks.id === id);
    setTask(editTasks.task);
    setTakId(id);
  };

  return (
    <div className="task-container">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => {
            setTask(e.target.value);
          }}
          value={task}
        />
        <button className="submit-button" type="submit">
          {taskID ? (
            <FontAwesomeIcon icon="edit" />
          ) : (
            <FontAwesomeIcon icon="add" />
          )}
        </button>
      </form>
      <ul className="task-list">
        {taskList.map(({ id, task }) => (
          <li key={id}>
            <div className="task-li">{task}</div>
            <div className="task-button">
              <button
                onClick={() => {
                  handelEdit(id);
                }}
              >
                <FontAwesomeIcon icon="edit" />
              </button>
              <button onClick={() => handeleDelete(id)}>
                {" "}
                <FontAwesomeIcon icon="trash" />{" "}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
