import { create } from "zustand";

import { shallow } from "zustand/shallow";

import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  tasksInOngoing: 0,
  addTask: (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set(
      (store) => ({
        tasks: store.tasks.filter((task) => task.title !== title),
      }),
      false,
      "deleteTask"
    ),
  setDraggedTask: (task) => set({ draggedTask: task }, false, "setDraggedTask"),
  moveTask: (title, state) =>
    set(
      (store) => ({
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      }),
      false,
      "moveTask"
    ),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  subscribeWithSelector(
    log(
      devtools(
        persist(store, {
          name: "tasks-store",
          getStorage: () => localStorage,
        }),
        { name: "tasks-store-devtools" }
      ),
      shallow
    )
  )
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks) => {
    useStore.setState({
      tasksInOngoing: newTasks.filter((task) => task.state === "ONGOING")
        .length,
    });
  }
);
