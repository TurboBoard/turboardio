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

            <Edit {...bounty} />
        </section>
    </div>
);

export default Layout;
