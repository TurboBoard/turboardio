import { useEffect, useRef } from "react";

import Script from "next/script";

const get_twitch_channel = async (): Promise<string | null> => {
    const response = await fetch(`/api/zone`);

    const { twitch_channel } = await response.json();

    return twitch_channel || null;
};

const Layout = () => {
    const embed = useRef<any>();

    useEffect(() => {
        const interval = setInterval(set_channel, 5000);

        set_channel();

        return () => clearInterval(interval);
    }, []);

    const handle_load = () => {
        if (embed.current) return;

        // @ts-ignore
        embed.current = new window.Twitch.Embed("twitch-embed", {
            width: "100%",
            height: "100%",
            channel: "twitch",
        });

        set_channel();
    };

    const set_channel = async () => {
        const twitch_channel = await get_twitch_channel();

        if (!embed.current && !twitch_channel) return;

        embed.current.setChannel(twitch_channel);
    };

    return (
        <div>
            <Script src="https://embed.twitch.tv/embed/v1.js" onLoad={handle_load} />

            <section>
                <div className="h-[75vh]" id="twitch-embed" />
            </section>
        </div>
    );
};

export default Layout;

//
