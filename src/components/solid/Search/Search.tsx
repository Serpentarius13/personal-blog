import { createSignal, lazy, type Component } from "solid-js";
import { Portal } from "solid-js/web";
import type { SearchRecord } from "./types";

interface Props {
  records: SearchRecord[];
}

const LazySearchList = lazy(() =>
  import("./SearchList").then((r) => ({ default: r.SearchList })),
);

export const Search: Component<Props> = ({ records }) => {
  let dialogRef: HTMLDialogElement | undefined;

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <button
        class="btn btn-primary"
        onClick={() => {
          dialogRef?.showModal();
          setOpen(true);
        }}
      >
        {" "}
        open
      </button>
      <Portal>
        <dialog ref={dialogRef} id="my_modal_3" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            {open() && <LazySearchList records={records} />}
          </div>{" "}
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Portal>
    </>
  );
};
