import type { AppProps } from "next/app";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import { TurboardioUserProvider } from "@Context/TurboardioUser";

import Layout from "@Layouts/App";

import "@Styles";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <TurboardioUserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </TurboardioUserProvider>
        </UserProvider>
    );
}

export default MyApp;
