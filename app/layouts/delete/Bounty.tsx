import Bounty from "@Components/Bounty";
import DeleteBounty from "@Components/delete/Bounty";

import { DeleteBountyProps } from "@Props";

const Layout = ({ bounty }: DeleteBountyProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        {!bounty.is_locked && (
            <section>
                <DeleteBounty bounty_id={bounty.id} />
            </section>
        )}
    </div>
);

export default Layout;
