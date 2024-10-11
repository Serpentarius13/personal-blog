import { CONFIG } from "config";

export function debounce<T extends (...args: any[]) => void>(
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

export function minWait<T>(
  promise: Promise<T>,
  minDuration: number,
): Promise<T> {
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

export const getAbsoluteUrl = (url: string) => {
  return new URL(url, CONFIG.SITE_URL);
};
