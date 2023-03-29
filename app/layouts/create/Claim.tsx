import Bounty from "@Components/bounty/Bounty";
import CreateClaim from "@Components/create/Claim";

import { CreateClaimProps } from "@Props";

const Layout = ({ bounty: { admin, amount, created_at, details, end_date, game, id, start_date } }: CreateClaimProps) => (
    <div>
        <section>
            <Bounty admin={admin} amount={amount} created_at={created_at} details={details} end_date={end_date} game={game} start_date={start_date} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <CreateClaim bounty_id={id} />
        </section>
    </div>
);

export default Layout;
