import React, { createContext, useContext, useEffect } from "react";
import Router from "next/router";

export const ScrollPositionContext = createContext({
  triggerScroll: () => null,
});

export const useScrollPosition = () => useContext(ScrollPositionContext);

const cache: { [path: string]: { x: number; y: number } } = {};
let routerBound = false;
let scrollRestored = false;
let shouldScrollRestore = false;

interface ScrollProviderProps {
  children: React.ReactElement;
}

export default function ScrollProvider({
  children,
}: ScrollProviderProps): React.ReactElement {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Commented out because I'm not sure if its necessary
    // if (window?.history?.scrollRestoration) {
    //   window.history.scrollRestoration = 'manual';
    // }

    const handleChangeStart = () => {
      cache[Router.asPath] = {
        x: window.scrollX || window.pageXOffset,
        y: window.scrollY || window.pageYOffset,
      };
      scrollRestored = false;
    };

    const handleChangeComplete = () => {
      if (shouldScrollRestore && cache[Router.asPath]) {
        const { x, y } = cache[Router.asPath];
        window.scrollTo(x, y);
        shouldScrollRestore = false;
        scrollRestored = true;
      }
    };

    if (!routerBound) {
      routerBound = true;
      Router.events.on("routeChangeStart", handleChangeStart);
      Router.events.on("routeChangeComplete", handleChangeComplete);
    }

    Router.beforePopState(() => {
      shouldScrollRestore = true;
      return true;
    });

    // // Commented out because not sure if it works
    // return () => {
    //   router.events.off('routeChangeStart', handleChangeStart);
    //   router.events.on('routeChangeComplete', handleChangeComplete);
    // };
  });

  const triggerScroll = () => {
    if (scrollRestored && cache[Router.asPath]) {
      const { x, y } = cache[Router.asPath];
      window.scrollTo(x, y);
    }
  };

  return (
    <ScrollPositionContext.Provider value={{ triggerScroll }}>
      {children}
    </ScrollPositionContext.Provider>
  );
}
