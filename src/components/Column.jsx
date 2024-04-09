import Task from "./Task";
import "./Column.css";
import { useStore } from "../store";

export default function Column({ state }) {
  const tasks = useStore((store) =>
    store.tasks.filter((task) => task.state === state)
  );

  console.log("tasks", tasks);
  return (
    <div className="column">
      <p>{state}</p>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
    </div>
  );
}
