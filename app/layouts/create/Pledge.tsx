import Bounty from "@Components/Bounty";
import CreatePledge from "@Components/create/Pledge";

import { CreatePledgeProps } from "@Props";

const Layout = ({ bounty: { admin, amount, created_at, details, end_date, game, id, start_date } }: CreatePledgeProps) => (
    <div>
        <section>
            <Bounty admin={admin} amount={amount} created_at={created_at} details={details} end_date={end_date} game={game} start_date={start_date} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <CreatePledge bounty_id={id} />
        </section>
    </div>
);

export default Layout;
