import { useEffect } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import Footer from "@Components/footer/Footer";
import Header from "@Components/header/Header";

import { blur } from "@Lib";

const handle_route_change = () => {
    blur();
};

const Layout = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        // window.location.replace("https://twitter.com/TurboBoardIO");
    }, []);

    useEffect(() => {
        router.events.on("routeChangeComplete", handle_route_change);

        return () => {
            router.events.off("routeChangeComplete", handle_route_change);
        };
    }, [router.events]);

    let title = "Turbo Board";

    if (children?.props?.page_title) {
        title += ` | ${children?.props?.page_title}`;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <Header />

            <main className="main" role="main">
                {children}
            </main>

            <Footer />
        </>
    );
};

export default Layout;
