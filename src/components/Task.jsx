import classNames from "classnames";
import { useStore } from "../store";
import "./Task.css";
import trash from "../assets/trash.svg";

export default function Task({ title }) {
  const task = useStore((store) =>
    store.tasks.find((task) => task.title === title)
  );

  const deleteTask = useStore((store) => store.deleteTask);
  const setDraggetTask = useStore((store) => store.setDraggedTask);
  return (
    <div className="task" draggable onDragStart={() => setDraggetTask(task)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            src={trash}
            alt="delete"
            onClick={() => deleteTask(task.title)}
          />
        </div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}
