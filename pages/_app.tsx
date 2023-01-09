import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import Layout from "@Layouts/App";

import "@Styles";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    );
}

export default MyApp;
