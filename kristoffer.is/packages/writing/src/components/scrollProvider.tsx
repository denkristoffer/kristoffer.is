import React, { useEffect } from "react";
import Router from "next/router";

const cache: { [path: string]: { x?: number; y: number } } = {};
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

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleChangeStart = () => {
      cache[Router.asPath] = {
        y: window.scrollY || window.pageYOffset,
      };
      scrollRestored = false;
    };

    const handleChangeComplete = () => {
      if (shouldScrollRestore && cache[Router.asPath]) {
        const { y } = cache[Router.asPath];
        window.scrollTo(0, y);
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

  return children;
}
