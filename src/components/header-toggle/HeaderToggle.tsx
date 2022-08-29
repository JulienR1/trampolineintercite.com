import { Keys } from "@trampo/resources/keys";
import { CSSProperties, KeyboardEvent, useCallback, useRef } from "react";

interface IProps {
  size?: number;
  onToggle: (isToggled: boolean) => void;
}

export function HeaderToggle({ size = 30, onToggle }: IProps) {
  const checkboxElement = useRef<HTMLInputElement>(null);

  const toggle = useCallback(
    () => onToggle(checkboxElement.current.checked),
    [onToggle],
  );

  const onKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code.toString().includes(Keys.Enter)) {
        checkboxElement.current.checked = !checkboxElement.current.checked;
        toggle();
      }
    },
    [toggle],
  );

  return (
    <div className="headerToggle" style={{ "--size": size } as CSSProperties}>
      <input
        ref={checkboxElement}
        type="checkbox"
        id="headerToggle__input"
        onChange={toggle}
        onKeyPress={onKeyPress}
        tabIndex={0}
      />
      <label
        htmlFor="headerToggle__input"
        className="headerToggle__container"
        tabIndex={-1}>
        <div className="headerToggle__line"></div>
        <div className="headerToggle__line"></div>
        <div className="headerToggle__line"></div>
      </label>
    </div>
  );
}
