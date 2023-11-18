import React, { useEffect, useRef } from "react";

const useInterSectionObserver = (ref: any, callBack: () => void) => {
  const observerRef = useRef<IntersectionObserver>();
  const callBackRef = useRef<Function>();
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && callBackRef.current) {
          callBackRef.current();
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0%",
      }
    );
    callBackRef.current = callBack;
  }, []);

  useEffect(() => {
    if (ref?.current && observerRef.current) {
      observerRef.current.observe(ref.current);
    }
    if (ref?.current) {
      callBackRef.current = callBack;
    }
  }, [ref?.current]);
  return {};
};

export default useInterSectionObserver;
