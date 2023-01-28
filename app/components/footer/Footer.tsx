import Link from "next/link";

import Envelope from "@Svgs/Envelope";
import Discord from "@Svgs/Discord";
import Github from "@Svgs/Github";
import Logo from "@Svgs/Logo";
import Twitter from "@Svgs/Twitter";

import ThemeToggle from "@Components/footer/ThemeToggle";

const Component = () => (
    <div className="pb-2 sm:pb-3 md:pb-4 lg:pb-5 bg-byzantium bg-cover bg-bottom" style={{ backgroundImage: "url(/img/header.jpg)" }}>
        <div className="divider divider--left-up bg-body" />

        <div className="gutter py-7">
            <div className="relative flex flex-col">
                <div className="flex justify-start">
                    <Link href="/">
                        <a className="opacity-link block h-9 mb-7">
                            <Logo />
                        </a>
                    </Link>
                </div>

                <div className="flex space-x-6 mb-8">
                    {[
                        { href: "https://twitter.com/TurboBoardIO", icon: <Twitter />, key: "twitter" },
                        { href: "https://discord.gg/7cZvW3AZ7M", icon: <Discord />, key: "discord" },
                        { href: "https://github.com/TurboBoard/turboardio", icon: <Github />, key: "github" },
                        { href: "mailto:hello@turboboard.io", icon: <Envelope />, key: "envelope" },
                    ].map(({ href, icon, key }) => (
                        <a key={key} className="opacity-link block h-7 text-light" href={href} rel="noreferrer" target="_blank">
                            {icon}
                        </a>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-7">
                    {[
                        { handle: "faq", text: "FAQ" },
                        { handle: "patch-notes", text: "Patch Notes" },
                        { handle: "privacy-policy", text: "Privacy Policy" },
                        { handle: "terms-and-conditions", text: "Terms & Conditions" },
                    ].map(({ handle, text }) => (
                        <Link key={handle} href={`/page/${handle}`}>
                            <a className="opacity-link text-light">{text}</a>
                        </Link>
                    ))}
                </div>

                <div className="absolute right-0 bottom-0 text-light">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </div>
);

export default Component;
