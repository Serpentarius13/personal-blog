import { type FC, type ReactNode, useState } from "react";

interface Props {
  children?: ReactNode;
}

export const Counter: FC<Props> = ({}) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <h4 className="!mb-0">Simple counter that works!</h4>
      <div className="flex items-center gap-2">
        <button className="btn btn-primary btn-sm" onClick={() => setValue((v) => v - 1)}>
          -
        </button>
        <p>{value}</p>
        <button className="btn btn-primary btn-sm" onClick={() => setValue((v) => v + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
