import Bounty from "@Components/Bounty";
import Edit from "@Components/edit/Winners";

import { EditWinnersProps } from "@Props";

const Layout = ({ bounty }: EditWinnersProps) => (
    <div>
        <section>
            <Bounty {...bounty} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <h1>Edit Winners</h1>

            {bounty.claims ? <Edit {...bounty} /> : <p>There are currently no claims on this bounty.</p>}
        </section>
    </div>
);

export default Layout;
