import { useEffect, useState } from "react";

import BountiesItem from "@Components/BountiesItem";
import Loading from "@Components/Loading";

import { Bounties } from "@Types";

const get_bounties = async (set_bounties: Function) => {
    const response = await fetch("/api/get/account_pledges");

    const { bounties } = await response.json();

    if (bounties) {
        set_bounties(bounties);
    }
};

const Layout = () => {
    const [bounties, set_bounties] = useState<Bounties | null>(null);

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

            <div className="divide-y">
                {bounties.map((bounties_item) => (
                    <BountiesItem key={bounties_item.id} {...bounties_item} />
                ))}
            </div>
        </section>
    );
};

export default Layout;
