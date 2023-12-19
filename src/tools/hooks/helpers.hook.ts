export function useHelpers() {
  function debounce<T extends Array<any>>(func: (...args: T) => void, delay = 3000) {
    let timerId: ReturnType<typeof setTimeout> | null = null;

    return (...args: T) => {
      if (timerId) {
        clearTimeout(timerId);
      }

      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, delay);
    };
  }

  return {
    debounce,
  }
}
