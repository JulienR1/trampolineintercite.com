import { routeLabels } from "@trampo/routes";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";

import { Footer } from "../footer";
import { Header } from "../header";
import { SkipNavigation } from "../skip-navigation";
import { TopArrow } from "../top-arrow";

interface IProps {
  children: ReactNode | ReactNode[];
}

export function Layout({ children }: IProps) {
  const nextRouter = useRouter();

  const pageTitle = useMemo(() => {
    const path = nextRouter.asPath.split("?").shift();
    const label = routeLabels[path] ?? "";
    const formattedLabel = label ? `| ${label}` : "";
    return `Trampoline Intercité ${formattedLabel}`;
  }, [nextRouter.asPath]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <SkipNavigation skipTarget="#content" />
      <Header />
      <div id="content">{children}</div>
      <Footer />
      <TopArrow />
    </>
  );
}
