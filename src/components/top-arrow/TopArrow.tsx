import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

export function TopArrow() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(
    () =>
      "scrollBehavior" in document.documentElement
        ? window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        : window.scrollTo(0, 0),
    [],
  );

  const onScroll = useCallback(() => setIsVisible(window.scrollY > 50), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <button
      aria-label="Scroll to top" // TODO: Translate i18n
      className={classNames("topArrow", { "topArrow--visible": isVisible })}
      onClick={scrollToTop}
      tabIndex={0}>
      <div aria-hidden="true" className="topArrow__container" />
    </button>
  );
}
