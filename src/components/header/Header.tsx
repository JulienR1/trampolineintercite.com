import {
  useClickOutside,
  useFilteredRouter,
  useScreenSize,
} from "@trampo/hooks";
import { LAPTOP } from "@trampo/resources/screen-sizes";
import { router, Routes } from "@trampo/routes";
import classNames from "classnames";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Dropdown } from "../dropdown";
import { DropdownRef } from "../dropdown/types";
import { HeaderToggle, HeaderToggleRef } from "../header-toggle";
import { Logo } from "../logo";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerToggleRef = useRef<HeaderToggleRef>(null);
  const dropdownRefs = useRef<(DropdownRef | undefined)[]>([]);

  const [isOpened, setIsOpened] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const blurHeader = useCallback(() => {
    headerToggleRef.current.setValue(false);
    dropdownRefs.current.forEach(dropdown => dropdown?.close());
  }, []);

  const { size: screenSize } = useScreenSize();
  useClickOutside(headerRef, blurHeader);

  const headerRouter = useFilteredRouter(router, { isHeader: true });

  const onScroll = useCallback(() => setHasScrolled(window.scrollY > 0), []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <header
      ref={headerRef}
      className={classNames("header", { "header--scroll": hasScrolled })}>
      <div className="header__mobile">
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
          {headerRouter.map((routeDetails, index) =>
            routeDetails.subroutes ? (
              <Dropdown
                key={routeDetails.route}
                ref={el => (dropdownRefs.current[index] = el)}
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
                <a
                  aria-label={routeDetails.label}
                  className={classNames("header__link", "header__link--title", {
                    "header__link--home": routeDetails.route === Routes.HOME,
                  })}>
                  {routeDetails.route === Routes.HOME ? (
                    <Logo />
                  ) : (
                    routeDetails.label
                  )}
                </a>
              </Link>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
