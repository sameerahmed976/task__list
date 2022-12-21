import React, { useEffect, useState } from "react";

import TaskList from "./TaskList";
import ShowAlert from "./ShowAlert";

const getLocalStorageItem = () => {
  const item = localStorage.getItem("task");
  if (item) {
    return JSON.parse(localStorage.getItem("task"));
  }
  return [];
};

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const [list, setList] = useState(getLocalStorageItem());

  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(list));
  }, [list]);

  // console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("click");

    // console.log(inputValue);

    if (!inputValue) {
      showAlert(true, "add valid task", "danger");
      // alert("enter valid value");
    } else if (inputValue && isEditing) {
      //   const newList = list.filter((item) => {
      //     if (item.id === editId) {
      //       return { ...item, title: inputValue };
      //     }
      //   }
      // })
      const newList = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: inputValue };
        }
        return item;
      });

      setList(newList);
      setEditId(null);
      setIsEditing(false);
      setInputValue("");

      showAlert(true, "edited task added", "success");
    } else {
      const newItem = {
        id: new Date().getTime().toLocaleString(),
        title: inputValue,
      };

      setList([...list, newItem]);
      setInputValue("");
      showAlert(true, "task added", "success");
      setIsEditing(false);
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({
      show,
      msg,
      type,
    });
  };

  const clearAllTask = () => {
    showAlert(true, "all task removed", "danger");
    setList([]);
  };

  const deleteTask = (id) => {
    const newTask = list.filter((item) => item.id !== id);

    setList(newTask);
    showAlert(true, " task removed", "danger");
  };
  const editTask = (id) => {
    const newItem = list.find((item) => item.id === id);
    // console.log(`* ~ file: App.jsx:84 ~ editTask ~ newItem`, newItem);

    // console.log(newTask);
    setIsEditing(true);
    setEditId(id);
    setInputValue(newItem.title);

    // setList(newTask);
    // showAlert(true, " task removed", "danger");
  };

  return (
    <>
      <main className="main">
        <section className="main__container">
          {alert.show ? (
            <ShowAlert alert={alert} removeAlert={showAlert} list={list} />
          ) : null}

          <h1 className="task">Task List</h1>
          <div className="underline"></div>

          <form onSubmit={handleSubmit} className="form__container">
            <input
              type="text"
              name="task"
              id="task"
              className="task__input"
              placeholder="enter a task"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="btn btn--task">
              submit
            </button>
          </form>

          <TaskList list={list} deleteTask={deleteTask} editTask={editTask} />

          {list.length > 0 && (
            <button className="btn btn--clear" onClick={clearAllTask}>
              clear tasks
            </button>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
