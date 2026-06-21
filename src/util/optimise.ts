export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
}

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    gap: number
  ): (...args: Parameters<T>) => void {
    let inThrottle = false;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      if (inThrottle) return;
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, gap);
    };
  }