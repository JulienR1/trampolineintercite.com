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
    const label = routeLabels[nextRouter.asPath] ?? "";
    const formattedLabel = label ? `| ${label}` : "";
    return `Trampoline Intercité ${formattedLabel}`;
  }, [nextRouter.asPath]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <SkipNavigation skipTarget="#main" />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <TopArrow />
    </>
  );
}
