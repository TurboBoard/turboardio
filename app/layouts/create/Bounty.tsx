import CreateBounty from "@Components/create/Bounty";
import Game from "@Components/Game";

import { CreateBountyProps } from "@Props";

const Layout = ({ game }: CreateBountyProps) => (
    <section>
        <div className="mb-7 md:mb-8">
            <Game game={game} href={`/game/${game.id}`} />
        </div>

        <h1 className="mb-7">Create Bounty</h1>

        <CreateBounty />
    </section>
);

export default Layout;
