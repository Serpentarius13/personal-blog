import { createMemo, createSignal } from "solid-js";

export const Counter = ({}) => {
  const [get, write] = createSignal(0);

  const memo = createMemo(() => get() + 1);

  return (
    <div class="flex items-center gap-2 ">
      <button onClick={() => write((v) => v + 1)}>Increment</button>
      <p>Count: {get()}</p>
      <button onClick={() => write((v) => v - 1)}>Decrement</button>

      <div>+1: {memo()}</div>
    </div>
  );
};
