export {};

/* eslint-disable  @typescript-eslint/no-explicit-any */
declare global {
  interface EchartsInstance {
    setOption(opt: object): void;
    on(e: string, cb: (...args: any[]) => void);
  }

  // extends window
  interface Window {
    echarts: {
      init(e: HTMLElement | null): EchartsInstance;
    };
  }
  // directly used global vars
  const echarts: any;
}
