import Head from "next/head";

// import Footer from "@Components/Footer";
// import Header from "@Components/Header";

const Layout = ({ children }: any) => {
    let title = "Turbo Board";

    if (children?.props?.page_title) {
        title += ` | ${children?.props?.page_title}`;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            {/* <Header /> */}

            <main className="main" role="main">
                {children}
            </main>

            {/* <Footer /> */}
        </>
    );
};

export default Layout;
