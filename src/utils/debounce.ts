export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;
  
    return function (this: any, ...args: Parameters<T>): void {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }
  