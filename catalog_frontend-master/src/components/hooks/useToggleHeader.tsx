import { useCallback, useRef } from "react"

export const useToggleHeader = () => {
  const headerRef = useRef<HTMLElement | null>(null);

  const handleHide = useCallback(() => {
    if (!headerRef.current) {
      headerRef.current = document.querySelector("header.header");
    }
    if (headerRef.current) {
      headerRef.current.classList.add("hidden");
    }
  }, []);

  const handleShow = useCallback(() => {
    if (!headerRef.current) {
      headerRef.current = document.querySelector("header.header");
    }
    if (headerRef.current) {
      headerRef.current.classList.remove("hidden");
    }
  }, []);

  return {
    hide: handleHide,
    show: handleShow
  }
}