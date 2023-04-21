import Bounty from "@Components/Bounty";
import CreateClaim from "@Components/create/Claim";

import { CreateClaimProps } from "@Props";

const Layout = ({ bounty }: CreateClaimProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <CreateClaim bounty_id={bounty.id} />
        </section>
    </div>
);

export default Layout;
