import Link from "next/link";

import BountiesItem from "@Components/BountiesItem";

import { Bounties } from "@Types";

const Component = ({ bounties }: { bounties: Bounties }) => (
    <div className="divide-y divide-silver">
        {bounties.map((bounties_item) => (
            <Link key={bounties_item.id} className="fade-link" href={`/bounty/${bounties_item.id}`}>
                <BountiesItem {...bounties_item} />
            </Link>
        ))}
    </div>
);

export default Component;
