import { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  listeningPhase: boolean = true
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listeningPhase);
    return () => {
      document.removeEventListener("click", handleClick, listeningPhase);
    };
  }, [listeningPhase, handler]);

  return ref;
};
export default useOutsideClick;
