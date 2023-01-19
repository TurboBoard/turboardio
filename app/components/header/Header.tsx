import Link from "next/link";

import Logo from "@Svgs/Logo";
import User from "@Components/header/User";

const Component = () => (
    <div className="relative bg-byzantium bg-cover bg-top" style={{ backgroundImage: "url(/img/header.jpg)" }}>
        <div className="gutter pt-7 pb-6 lg:pb-5">
            <div className="relative z-10 flex justify-between items-center text-light">
                <div className="flex-1 flex justify-start">
                    <Link href="/">
                        <a className="opacity-link block h-7 md:h-8 lg:h-9 transform translate-y-3 md:translate-y-4 lg:translate-y-5">
                            <Logo />
                        </a>
                    </Link>
                </div>

                <Link href="/bounties">
                    <a className="opacity-link font-heading text-xl md:text-2xl lg:text-4xl leading-none tracking-wide whitespace-nowrap">Bounty Board</a>
                </Link>

                <div className="flex-1 flex justify-end">
                    <User />
                </div>
            </div>

            <div className="absolute inset-0 z-0 bg-dark opacity-50" />
        </div>

        <div className="divider divider--right-down bg-body" />
    </div>
);

export default Component;
