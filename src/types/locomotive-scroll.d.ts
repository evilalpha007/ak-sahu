declare module "locomotive-scroll" {
  export interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    [key: string]: unknown;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    scroll: { instance: { scroll: { x: number; y: number } } };
    on(event: string, callback: (...args: unknown[]) => void): void;
    update(): void;
    scrollTo(
      target: number | string | HTMLElement,
      options?: { duration?: number; disableLerp?: boolean; [key: string]: unknown },
    ): void;
    destroy(): void;
  }
}
