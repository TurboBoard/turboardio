import Link from "next/link";

import BountiesItem from "@Components/BountiesItem";

import { BountiesProps } from "@Props";

const Layout = ({ bounties }: BountiesProps) => (
    <section>
        <h1 className="text-center">Latest Bounties</h1>

        <div className="divide-y">
            {bounties.map((bounties_item) => (
                <BountiesItem key={bounties_item.id} {...bounties_item} />
            ))}
        </div>
    </section>
);

export default Layout;
