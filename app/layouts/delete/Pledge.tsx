import Bounty from "@Components/Bounty";
import DeletePledge from "@Components/delete/Pledge";

import { DeletePledgeProps } from "@Props";

const Layout = ({ bounty, pledge }: DeletePledgeProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <DeletePledge bounty_id={bounty.id} pledge={pledge} />
        </section>
    </div>
);

export default Layout;
