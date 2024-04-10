import Task from "./Task";
import "./Column.css";
import { useStore } from "../store";
import { useState } from "react";
import classNames from "classnames";

export default function Column({ state }) {
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const addTask = useStore((store) => store.addTask);
  const setDraggetTask = useStore((store) => store.setDraggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const [drop, setDrop] = useState(false);

  console.log("tasks", tasks);
  return (
    <div
      className={classNames("column", { drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        moveTask(draggedTask.title, state);
        setDraggetTask(null);
        setDrop(false);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>+</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              onClick={() => {
                addTask(text, state);
                setOpen(false);
                setText("");
              }}
            >
              Add task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
