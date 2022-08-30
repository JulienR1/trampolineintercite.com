import { Keys } from "@trampo/resources/keys";
import {
  CSSProperties,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

import { HeaderToggleRef } from "./types";

interface IProps {
  size?: number;
  onToggle: (isToggled: boolean) => void;
}

export const HeaderToggle = forwardRef<HeaderToggleRef, IProps>(
  ({ size = 30, onToggle }, ref) => {
    const checkboxElement = useRef<HTMLInputElement>(null);

    const toggle = useCallback(
      () => onToggle(checkboxElement.current.checked),
      [onToggle],
    );

    const setValue = useCallback(
      (value: boolean) => {
        checkboxElement.current.checked = value;
        toggle();
      },
      [toggle],
    );

    useImperativeHandle(ref, () => ({
      setValue,
    }));

    const onKeyPress = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code.toString().includes(Keys.Enter)) {
          setValue(!checkboxElement.current.checked);
        }
      },
      [setValue],
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
  },
);
