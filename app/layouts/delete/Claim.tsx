import Bounty from "@Components/Bounty";
import DeleteClaim from "@Components/delete/Claim";

import { DeleteClaimProps } from "@Props";

const Layout = ({ bounty, claim }: DeleteClaimProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <DeleteClaim bounty_id={bounty.id} claim={claim} />
        </section>
    </div>
);

export default Layout;
