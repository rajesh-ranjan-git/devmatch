import { useEffect } from "react";
import { UseOutsideClickProps } from "@/types/propTypes";

const useOutsideClick = ({ ref, callback }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
      // console.log("debug ref : ", ref);
      // console.log("debug ref?.current : ", ref?.current);
      console.log("debug event.target : ", event.target);
      // console.log(
      //   "debug ref?.current?.contains(event.target as Node) : ",
      //   ref?.current?.contains(event.target as Node)
      // );
      // console.log(
      //   "debug !ref?.current?.contains(event.target as Node) : ",
      //   !ref?.current?.contains(event.target as Node)
      // );

      // if (
      //   ref.current &&
      //   event.target &&
      //   !ref.current.contains(event.target as Node)
      // ) {
      //   callback(event);
      // }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
