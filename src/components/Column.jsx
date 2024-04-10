import Task from "./Task";
import "./Column.css";
import { useStore } from "../store";
import { useState } from "react";

export default function Column({ state }) {
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const addTask = useStore((store) => store.addTask);
  const setDraggetTask = useStore((store) => store.setDraggedTask);

  console.log("tasks", tasks);
  return (
    <div
      className="column"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDraggetTask(null);
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
