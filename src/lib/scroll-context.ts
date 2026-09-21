export type Scroller = HTMLElement | Window;

let readyScroller: Scroller | null = null;
const waiters: ((scroller: Scroller) => void)[] = [];

export function markScrollReady(scroller: Scroller) {
  readyScroller = scroller;
  waiters.splice(0).forEach((cb) => cb(scroller));
}

/** Calls back immediately if already ready, otherwise waits. Returns an unsubscribe fn. */
export function onScrollReady(cb: (scroller: Scroller) => void) {
  if (readyScroller) {
    cb(readyScroller);
    return () => {};
  }
  waiters.push(cb);
  return () => {
    const i = waiters.indexOf(cb);
    if (i >= 0) waiters.splice(i, 1);
  };
}

/** Forget the current scroller so new subscribers wait for the next one (route changes). */
export function resetScrollReady() {
  readyScroller = null;
}
