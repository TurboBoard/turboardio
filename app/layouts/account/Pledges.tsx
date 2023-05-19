import { useEffect, useState } from "react";

import Link from "next/link";

import BountiesItem from "@Components/BountiesItem";
import Loading from "@Components/Loading";

import { PledgeItem } from "@Types";

const get_bounties = async (set_bounties: Function) => {
    const response = await fetch("/api/get/account_pledges");

    const { bounties } = await response.json();

    if (bounties) {
        set_bounties(bounties);
    }
};

const Layout = () => {
    const [bounties, set_bounties] = useState<PledgeItem[] | null>(null);

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
                <h1 className="mb-7">Your Pledges</h1>

                <p>You currently do not have any pledges.</p>
            </section>
        );
    }

    return (
        <section>
            <h1 className="mb-7">Your Pledges</h1>

            <div className="divide-y divide-silver">
                {bounties.map((bounties_item) => (
                    <div key={bounties_item.pledge_id}>
                        <BountiesItem {...bounties_item} />

                        <div className="account-buttons">
                            <Link className="button fade-link inline-block" href={`/bounty/${bounties_item.id}`}>
                                View Bounty
                            </Link>

                            <Link className="button fade-link inline-block" href={`/edit/pledge/${bounties_item.pledge_id}`}>
                                Edit Pledge
                            </Link>

                            <Link className="button fade-link inline-block" href={`/delete/pledge/${bounties_item.pledge_id}`}>
                                Delete Pledge
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Layout;
