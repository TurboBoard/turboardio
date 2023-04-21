import Link from "next/link";

import BountiesItem from "@Components/BountiesItem";

import { BountiesProps } from "@Props";

const Layout = ({ bounties }: BountiesProps) => (
    <div>
        <section>
            <h1>Search</h1>

            {/* prettier-ignore */}
            <p className="mb-0">Looking for a specific game?<br /><Link className="generic-link" href="/search">Click Here</Link> to search through 200,000+ games.</p>
        </section>

        <section>
            <h1>Latest Bounties</h1>

            <div className="divide-y">
                {bounties.map((bounties_item) => (
                    <BountiesItem key={bounties_item.id} {...bounties_item} />
                ))}
            </div>
        </section>
    </div>
);

export default Layout;
