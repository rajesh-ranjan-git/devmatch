"use client";

import { useEffect, useRef } from "react";
import { UseOutsideClickProps } from "@/types/propTypes";

const useOutsideClick = ({ ref, when, callback }: UseOutsideClickProps) => {
  const savedCallback = useRef(callback);

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      savedCallback.current();
    }
  };

  useEffect(() => {
    if (when) {
      document.addEventListener("click", handleOutsideClick);

      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [when]);

  useEffect(() => {
    savedCallback.current = callback;
  });
};

export default useOutsideClick;
