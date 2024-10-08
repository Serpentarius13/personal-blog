import Fuse, { type FuseResult } from "fuse.js";

import { actions } from "astro:actions";
import { createMemo, createSignal, type Component } from "solid-js";
import type { SearchRecord } from "./types";

interface Props {
  records: SearchRecord[];
}

export const SearchList: Component<Props> = (props) => {
  const records = () => props.records;

  const fuse = new Fuse(records(), {
    keys: ["title", "content", "description", "tags"],
    threshold: 0.45,
    ignoreLocation: true,
    includeScore: true,
    isCaseSensitive: true,
  });

  const [hasTriedSearching, setHasTriedSearching] = createSignal(false);
  const [search, setSearch] = createSignal("");

  const searchResults = createMemo<FuseResult<SearchRecord>[]>(() => {
    if (!search) {
      return records().map((record) => {
        return {
          refIndex: 0,
          item: record,
        } satisfies FuseResult<SearchRecord>;
      });
    }

    const results = fuse.search(search());
    return results;
  });

  const handleSetSearch = (value: string) => {
    setSearch(value);
    if (!hasTriedSearching) {
      setHasTriedSearching(true);
    }
  };

  const isNothingFound = () => searchResults().length === 0;

  const handler = () => {
    actions.myAction().then((r) => {
      console.log(r);
    });
  };

  return (
    <div class="mx-auto w-[300px] sm:w-[600px]">
      <button class="btn btn-primary" onClick={() => handler()}>
        CLICK
      </button>
      <div class="flex flex-col gap-2 px-4">
        {props.records.length}
        <input
          placeholder="Search anything here..."
          onChange={(ev) => handleSetSearch(ev.target.value)}
          value={search()}
        />

        <div class="mt-4 flex flex-col gap-4">
          {isNothingFound() ? (
            <div class="badge mx-auto py-4 text-lg">Nothing found</div>
          ) : (
            searchResults().map((result, index) => {
              return (
                <a
                  href={`/blog/${result.item.slug}`}
                  class="focus:shadow-3xl flex flex-col gap-2 border bg-base-100 p-4 transition-all duration-300 ease-in-out hover:shadow-2xl focus:shadow-2xl focus:shadow-black focus:outline-none dark:hover:border-primary dark:hover:shadow-none dark:focus:shadow-none"
                >
                  <div class="flex flex-col gap-2">
                    <h3 class="text-lg font-semibold">{result.item.title}</h3>
                    <p class="text-muted-foreground text-sm">
                      {result.item.description}
                    </p>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
