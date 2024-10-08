import { type FuseResult } from "fuse.js";

import { actions } from "astro:actions";
import { createSignal, type Component } from "solid-js";
import type { SearchRecord } from "./types";

interface Props {}

export const SearchList: Component<Props> = () => {
  const [error, setError] = createSignal<string>();
  const [isLoading, setIsLoading] = createSignal(false);
  const [hasTriedSearching, setHasTriedSearching] = createSignal(false);
  const [searchResults, setSearchResults] = createSignal<
    FuseResult<SearchRecord>[]
  >([]);

  const handleSearch = debounce(async (value: string) => {
    if (error()) {
      setError();
    }

    try {
      if (!hasTriedSearching) {
        setHasTriedSearching(true);
      }

      setIsLoading(true);

      const { data, error } = await minWait(
        actions.searchArticles({ search: value }),
        300,
      );

      if (error) {
        setError(error?.message);
        return;
      }

      if (data) {
        setSearchResults(data);
      }
    } catch (error) {
      if (error) {
        setError((error as Error)?.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  }, 250);

  const isNothingFound = () =>
    searchResults().length === 0 && hasTriedSearching();

  return (
    <div class="flex flex-col gap-2 px-4 h-full">
      <label class="input input-bordered flex items-center gap-2 w-full">
        <input
          placeholder="Search anything here..."
          onInput={(ev) => handleSearch(ev.target.value)}
          class="w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>

      <div class="mt-4 flex-1 h-0  overflow-visible">
        {isLoading() ? (
          <div> Loading.... </div>
        ) : isNothingFound() ? (
          <div class="badge mx-auto py-4 text-lg">Nothing found</div>
        ) : (
          <ul class="flex flex-col gap-4 ">
            {searchResults().map((result, index) => {
              return (
                <a
                  href={`/blog/${result.item.slug}`}
                  tabindex={0}
                  class="focus-within:shadow-xl card flex p-3 flex-col gap-2 transition-all hover:shadow-xl hover:shadow-primary focus-within:shadow-primary focus:outline-none"
                >
                  <div class="flex flex-col gap-2 card-content m-2">
                    <img
                      src={result.item.image}
                      class="max-h-[100px] max-w-full object-cover"
                    />
                    <h3 class="text-lg font-semibold">{result.item.title}</h3>
                    <p class="text-muted-foreground text-sm">
                      {result.item.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function minWait<T>(promise: Promise<T>, minDuration: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const startTime = Date.now();

    promise
      .then((result) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minDuration - elapsedTime;

        if (remainingTime > 0) {
          setTimeout(() => resolve(result), remainingTime);
        } else {
          resolve(result);
        }
      })
      .catch(reject);
  });
}
