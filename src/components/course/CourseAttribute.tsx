import { Range } from "@trampo/types";

import { Icon, IconFontset, IconName } from "../icon";

interface IProps<T> {
  icon: {
    name: IconName;
    fontset: IconFontset;
  };
  attribute: T | Range<T>;
  linkWord?: string;
  formatAttribute?: (attribute: T) => string;
  suffix?: string;
}

export const CourseAttribute = <T extends string | number | Date>({
  icon,
  attribute,
  linkWord = "à",
  formatAttribute = attr => attr.toString(),
  suffix = "",
}: IProps<T>) => {
  const isRange =
    Object.keys(attribute).includes("min") &&
    Object.keys(attribute).includes("max");

  const attributeStr = isRange
    ? [
        formatAttribute((attribute as Range<T>).min),
        linkWord,
        formatAttribute((attribute as Range<T>).max),
      ].join(" ")
    : formatAttribute(attribute as T);

  return (
    <div className="course__attribute">
      <Icon icon={icon.name} fontset={icon.fontset} />
      <p>{[attributeStr, suffix].join(" ")}</p>
    </div>
  );
};
