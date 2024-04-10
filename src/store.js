import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const store = (set) => ({
  tasks: [{ title: "test task", state: "ONGOING" }],
  draggedTask: null,
  addTask: (title, state) =>
    set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (task) => set({ draggedTask: task }),
});

export const useStore = createWithEqualityFn(store, shallow);
