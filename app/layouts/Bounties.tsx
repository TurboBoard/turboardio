import Bounties from "@Components/bounties/Bounties";
import Search from "@Components/bounties/Search";

import { BountiesProps } from "@Props";

const Page = ({ bounties }: BountiesProps) => {
    return (
        <div>
            <section>
                <h1>Bounty Search</h1>

                <Search bounties={bounties} />
            </section>

            <section>
                <h1>Latest Bounties</h1>

                <Bounties bounties={bounties} />
            </section>
        </div>
    );
};

export default Page;
