import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
const TaskList = ({ list, deleteTask, editTask }) => {
  return (
    <>
      {list.map((item) => {
        return (
          <section className="content__container" key={item.id}>
            <div className="task__content">
              <h2 className="task__text">{item.title}</h2>
              <div className="btn__group">
                <button
                  className="task__edit"
                  onClick={() => editTask(item.id)}
                >
                  <MdModeEdit />
                </button>
                <button
                  className="task__delete"
                  onClick={() => deleteTask(item.id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default TaskList;
