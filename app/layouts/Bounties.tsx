import { useEffect, useState } from "react";

import Bounties from "@Components/bounties/Bounties";
import Search from "@Components/bounties/Search";
import Tiger from "@Svgs/Tiger";

import { Bounties as BountiesType } from "@Types";
import { BountiesProps } from "@Props";

const get_bounties = async (set_bounties: Function) => {
    const response = await fetch(`/api/bounties/get`);

    const { bounties } = await response.json();

    set_bounties(bounties);
};

const Page = ({}: BountiesProps) => {
    const [bounties, set_bounties] = useState<BountiesType | null>(null);

    useEffect(() => {
        get_bounties(set_bounties);
    }, []);

    if (!bounties)
        return (
            <div>
                <Tiger />
            </div>
        );

    return (
        <div>
            {/* <section>
                <h1>Bounty Search</h1>

                <Search bounties={bounties} />
            </section> */}

            <section>
                <h1>Latest Bounties</h1>

                <Bounties bounties={bounties} />
            </section>
        </div>
    );
};

export default Page;
