import "material-icons/iconfont/material-icons.css";
import "@styles/globals.scss";

import { Layout } from "@trampo/components";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
