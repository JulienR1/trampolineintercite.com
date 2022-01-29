import "material-icons/iconfont/material-icons.css";
import "@styles/globals.scss";

import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default App;
