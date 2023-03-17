import Link from "next/link";

import Bounties from "@Components/Bounties";

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

            <Bounties bounties={bounties} />
        </section>
    </div>
);

export default Layout;
