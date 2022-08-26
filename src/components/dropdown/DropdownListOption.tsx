import { DropdownOption, IDropdownOption } from "./DropdownOption";

export function DropdownListOption(option: IDropdownOption) {
  return (
    <li className="dropdown__listoption">
      <DropdownOption {...option} />
    </li>
  );
}
