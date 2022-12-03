import type { AppProps } from "next/app";

import Layout from "@Layouts/App";

import "@Styles";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
