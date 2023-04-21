import Edit from "@Components/edit/Bounty";
import Game from "@Components/Game";

import { EditClaimProps } from "@Props";

const Layout = ({ bounty: { details, game, end_date, start_date } }: EditClaimProps) => (
    <div>
        <section>
            <h1>Edit Bounty</h1>

            <div className="mb-9">
                <Game game={game} href={`/game/${game.id}`} />
            </div>

            <Edit
                initial_state={{
                    details,
                    end_date: end_date || "",
                    start_date: start_date || "",
                }}
            />
        </section>
    </div>
);

export default Layout;
