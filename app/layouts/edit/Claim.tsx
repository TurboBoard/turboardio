import Bounty from "@Components/Bounty";
import Edit from "@Components/edit/Claim";

import { EditClaimProps } from "@Props";

const Layout = ({ bounty, claim }: EditClaimProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <Edit
                bounty_id={bounty.id}
                claim_id={claim.id}
                initial_state={{
                    comment: claim.comment,
                    link: claim.link,
                }}
            />
        </section>
    </div>
);

export default Layout;
