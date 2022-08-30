import { useClickOutside } from "@trampo/hooks";
import { Routes } from "@trampo/routes";
import { Router } from "@trampo/routes";
import classNames from "classnames";
import Link from "next/link";
import { useRef, useState } from "react";

import { Dropdown } from "../dropdown";
import { HeaderToggle, HeaderToggleRef } from "../header-toggle";
import { Logo } from "../logo";

interface IProps {
  router: Router;
}

export function Header({ router }: IProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerToggleRef = useRef<HeaderToggleRef>(null);
  const [isOpened, setIsOpened] = useState(false);

  useClickOutside(headerRef, () => headerToggleRef.current.setValue(false));

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
          {router.map(routeDetails =>
            routeDetails.subroutes ? (
              <Dropdown
                key={routeDetails.route}
                title={{ label: routeDetails.label, href: routeDetails.route }}
                options={routeDetails.subroutes.map(subroute => ({
                  label: subroute.label,
                  href: subroute.route,
                }))}
                className="header__link"
                pushContent
              />
            ) : (
              <Link href={routeDetails.route} key={routeDetails.route}>
                <a className="header__link">{routeDetails.label}</a>
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
