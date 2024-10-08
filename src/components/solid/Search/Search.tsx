import { Icon } from "@iconify-icon/solid";
import { createSignal, lazy, type Component } from "solid-js";
import { Portal } from "solid-js/web";
interface Props {}

const LazySearchList = lazy(() =>
  import("./SearchList").then((r) => ({ default: r.SearchList })),
);

export const Search: Component<Props> = ({}) => {
  let dialogRef: HTMLDialogElement | undefined;

  const [open, setOpen] = createSignal(false);

  return (
    <>
      <button
        class="btn btn-sm btn-ghost"
        onClick={() => {
          dialogRef?.showModal();
          setOpen(true);
        }}
      >
        <Icon icon="line-md:search" class="text-xl" />
      </button>
      <Portal>
        <dialog ref={dialogRef} id="my_modal_3" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div class="mx-auto  h-[min(600px,100vh)] ">
              {open() && <LazySearchList />}
            </div>
          </div>{" "}
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </Portal>
    </>
  );
};
