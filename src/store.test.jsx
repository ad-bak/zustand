import { useEffect } from "react";
import { useStore } from "./store";
import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

test("should return default value at the start", () => {
  const selector = (store) => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});
