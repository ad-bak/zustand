import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const store = (set) => ({
  tasks: [{ title: "test task", state: "PLANNED" }],
});

export const useStore = createWithEqualityFn(store, shallow);
