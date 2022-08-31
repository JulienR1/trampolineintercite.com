import { useClickOutside, useScreenSize } from "@trampo/hooks";
import { LAPTOP } from "@trampo/resources/screen-sizes";
import { Router, Routes } from "@trampo/routes";
import classNames from "classnames";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import { Dropdown } from "../dropdown";
import { DropdownRef } from "../dropdown/types";
import { HeaderToggle, HeaderToggleRef } from "../header-toggle";
import { Logo } from "../logo";

interface IProps {
  router: Router;
}

export function Header({ router }: IProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerToggleRef = useRef<HeaderToggleRef>(null);
  const [isOpened, setIsOpened] = useState(false);

  const dropdownRefs = useRef<(DropdownRef | undefined)[]>([]);

  const blurHeader = useCallback(() => {
    headerToggleRef.current.setValue(false);
    dropdownRefs.current.forEach(dropdown => dropdown?.close());
  }, []);

  const { size: screenSize } = useScreenSize();
  useClickOutside(headerRef, blurHeader);

  return (
    <header ref={headerRef} className="header">
      <div className={"header__mobile"}>
        <Link href={Routes.HOME}>
          <a className="header__link header__link--home">
            <Logo />
          </a>
        </Link>
        <HeaderToggle ref={headerToggleRef} onToggle={setIsOpened} />
      </div>

      <nav
        className={classNames("header__navigation", {
          "header__navigation--expanded": isOpened,
        })}>
        <div className="header__navigationTray">
          {router.map((routeDetails, index) =>
            routeDetails.subroutes ? (
              <Dropdown
                ref={el => (dropdownRefs.current[index] = el)}
                key={routeDetails.route}
                title={{ label: routeDetails.label, href: routeDetails.route }}
                options={routeDetails.subroutes.map(subroute => ({
                  label: subroute.label,
                  href: subroute.route,
                }))}
                className="header__link"
                titleClassName="header__link--title"
                pushContent={screenSize < LAPTOP}
                onConfirmation={blurHeader}
              />
            ) : (
              <Link href={routeDetails.route} key={routeDetails.route}>
                <a className="header__link header__link--title">
                  {routeDetails.label}
                </a>
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
