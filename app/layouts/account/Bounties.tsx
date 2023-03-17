import { useEffect, useState } from "react";

import Bounties from "@Components/Bounties";
import Loading from "@Components/Loading";

import { AccountBountiesProps } from "@Props";

const get_bounties = async (set_bounties: Function) => {
    const response = await fetch("/api/get/account_bounties");

    const { bounties } = await response.json();

    if (bounties) {
        set_bounties(bounties);
    }
};

const Layout = () => {
    const [bounties, set_bounties] = useState<AccountBountiesProps["bounties"] | null>(null);

    useEffect(() => {
        get_bounties(set_bounties);
    }, []);

    if (!bounties)
        return (
            <section>
                <div className="h-[30vw]">
                    <Loading />
                </div>
            </section>
        );

    if (!bounties.length) {
        return (
            <section>
                <h1 className="mb-7">Your Bounties</h1>

                <p>You currently do not have any bounties.</p>
            </section>
        );
    }

    return (
        <section>
            <h1 className="mb-7">Your Bounties</h1>

            <Bounties bounties={bounties} />
        </section>
    );
};

export default Layout;
