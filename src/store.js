import { create } from "zustand";

import { shallow } from "zustand/shallow";

import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  tasks: [{ title: "test task", state: "ONGOING" }],
  draggedTask: null,
  addTask: (title, state) =>
    set(
      (store) => ({ tasks: [...store.tasks, { title, state }] }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (task) => set({ draggedTask: task }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

export const useStore = create(
  devtools(
    persist(store, {
      name: "tasks-store",
      getStorage: () => localStorage,
    }),
    { name: "tasks-store-devtools" }
  ),
  shallow
);
