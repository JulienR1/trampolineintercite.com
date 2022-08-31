import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";

export function TopArrow() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }),
    [],
  );

  const onScroll = useCallback(() => setIsVisible(window.scrollY > 50), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <button
      className={classNames("topArrow", { "topArrow--visible": isVisible })}
      onClick={scrollToTop}>
      <div className="topArrow__container" />
    </button>
  );
}
