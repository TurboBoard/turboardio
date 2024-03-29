import Bounty from "@Components/Bounty";
import CreatePledge from "@Components/create/Pledge";

import { CreatePledgeProps } from "@Props";

const Layout = ({ bounty }: CreatePledgeProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <CreatePledge bounty_id={bounty.id} />
        </section>
    </div>
);

export default Layout;
