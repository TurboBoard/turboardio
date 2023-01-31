import { useEffect } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import Script from "next/script";

import Footer from "@Components/footer/Footer";
import Header from "@Components/header/Header";

import { blur } from "@Lib";

const handle_route_change = () => {
    blur();
};

const Layout = ({ children }: any) => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeComplete", handle_route_change);

        return () => {
            router.events.off("routeChangeComplete", handle_route_change);
        };
    }, [router.events]);

    let page_title = "Turbo Board";

    if (children.props.meta?.title) {
        page_title += ` - ${children.props.meta.title}`;
    }

    const meta_image = children.props.meta?.image || "https://images.ctfassets.net/2ecc939ll7aj/2U76tHCloaJHfeGWLJ462G/64252429efe5c250d5f27a3d4eaa92be/meta.jpg?w=1200&h=630&fit=fill&fm=jpg";

    return (
        <>
            <Head>
                <meta property="og:title" content={page_title} />
                {children.props.meta && (
                    <>
                        {/* Social Sharing */}
                        {children.props.meta.description && <meta property="og:description" content={children.props.meta.description} />}
                        {meta_image && (
                            <>
                                <meta property="og:image" content={meta_image} />
                                <meta name="twitter:card" content="summary_large_image" />
                            </>
                        )}

                        <meta property="og:type" content={children.props.meta.type} />
                        <meta property="og:url" content={children.props.meta.url} />
                    </>
                )}

                {/* Favicon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#660099" />
                <meta name="msapplication-TileColor" content="#660099" />
                <meta name="theme-color" content="#660099" />

                <title>{page_title}</title>
            </Head>

            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
                <>
                    {/* Google Analytics */}
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} strategy="afterInteractive" />

                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                        `}
                    </Script>
                </>
            )}

            <Header />

            <main className="main" role="main">
                {children}
            </main>

            <Footer />
        </>
    );
};

export default Layout;
