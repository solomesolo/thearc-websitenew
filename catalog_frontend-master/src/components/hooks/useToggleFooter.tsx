import { useCallback, useRef } from "react"

export const useToggleFooter = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  const handleHide = useCallback(() => {
    if (!footerRef.current) {
      footerRef.current = document.querySelector("div.footer");
    }
    if (footerRef.current) {
      footerRef.current.classList.add("hidden");
    }
  }, []);

  const handleShow = useCallback(() => {
    if (!footerRef.current) {
      footerRef.current = document.querySelector("div.footer");
    }
    if (footerRef.current) {
      footerRef.current.classList.remove("hidden");
    }
  }, []);

  const handleFix = useCallback(() => {
    if (!footerRef.current) {
      footerRef.current = document.querySelector("div.footer");
    }
    if (footerRef.current) {
      footerRef.current.classList.add("fixed");
    }
  }, []);

  const handleUnFix = useCallback(() => {
    if (!footerRef.current) {
      footerRef.current = document.querySelector("div.footer");
    }
    if (footerRef.current) {
      footerRef.current.classList.remove("fixed");
    }
  }, []);

  return {
    hide: handleHide,
    show: handleShow,
    unFix: handleUnFix,
    fix: handleFix,
  }
}