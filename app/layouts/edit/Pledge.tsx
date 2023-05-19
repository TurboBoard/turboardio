import Bounty from "@Components/Bounty";
import Edit from "@Components/edit/Pledge";

import { EditPledgeProps } from "@Props";

const Layout = ({ bounty, pledge }: EditPledgeProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <h1>Edit Pledge</h1>

            <Edit
                bounty_id={bounty.id}
                pledge_id={pledge.id}
                initial_state={{
                    amount: pledge.amount.toString(),
                }}
            />
        </section>
    </div>
);

export default Layout;
