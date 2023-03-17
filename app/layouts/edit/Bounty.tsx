import Delete from "@Components/delete/Bounty";
import Edit from "@Components/edit/Bounty";
import Game from "@Components/Game";

import { EditBountyProps } from "@Props";

const Layout = ({ bounty: { details, game, end_date, start_date } }: EditBountyProps) => (
    <div>
        <section>
            <h1>Edit Bounty</h1>

            <div className="mb-9">
                <Game {...game} />
            </div>

            <Edit
                initial_state={{
                    details,
                    end_date: end_date || "",
                    start_date: start_date || "",
                }}
            />
        </section>

        <section>
            <h1>Delete Bounty</h1>

            <Delete />
        </section>
    </div>
);

export default Layout;
