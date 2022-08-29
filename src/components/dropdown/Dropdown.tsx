import { useClickOutside, useKeyPress, useTouch } from "@trampo/hooks";
import { Keys } from "@trampo/resources/keys";
import classNames from "classnames";
import { useCallback, useRef, useState } from "react";

import { Icon, IconFontset, IconName } from "../icon";
import { DropdownListOption } from "./DropdownListOption";
import { DropdownOption, IDropdownOption } from "./DropdownOption";

interface IProps {
  title: IDropdownOption;
  options: IDropdownOption[];
  className?: string;
}

export function Dropdown({ title, options, className }: IProps) {
  const [isOpened, setIsOpened] = useState(false);
  const { isTouch } = useTouch();

  const closeDropdown = useCallback(() => {
    if (dropdownRef.current?.contains(document.activeElement)) {
      // TODO: find a way to focus the next element
      (document.activeElement as HTMLElement).blur();
    }
    setIsOpened(false);
  }, []);

  const toggleDropdown = () => {
    setIsOpened(previousToggleState => !previousToggleState);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => setIsOpened(false));
  useKeyPress(Keys.Escape, closeDropdown);

  return (
    <div
      ref={dropdownRef}
      className={classNames([
        "dropdown",
        { "dropdown--toggled": isOpened },
        { "dropdown--hoverable": !isTouch },
        className,
      ])}>
      <div className="dropdown__title">
        <DropdownOption {...title} />
        {isTouch && (
          <div className="dropdown__toggle" onClick={() => toggleDropdown()}>
            <Icon icon={IconName.Expand} fontset={IconFontset.Outlined} />
          </div>
        )}
      </div>

      <div className="dropdown__options">
        <ul className={"dropdown__options__slider"}>
          {options.map(option => (
            <DropdownListOption key={option.label} {...option} />
          ))}
        </ul>
      </div>
    </div>
  );
}
