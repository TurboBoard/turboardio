import Bounties from "@Components/Bounties";

import { BountiesProps } from "@Props";

const Layout = ({ bounties }: BountiesProps) => (
    <section>
        <h1 className="text-center">Latest Bounties</h1>

        <Bounties bounties={bounties} />
    </section>
);

export default Layout;
