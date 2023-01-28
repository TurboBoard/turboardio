import Bounties from "@Components/bounties/Bounties";
import Game from "@Components/igdb/Game";

import { GameProps } from "@Props";

const Page = ({ bounties, game }: GameProps) => (
    <div>
        <section>
            <div className="mb-9">
                <Game {...game} />
            </div>

            <div>
                <h2>Bounties</h2>

                <Bounties bounties={bounties} />
            </div>
        </section>
    </div>
);

export default Page;
