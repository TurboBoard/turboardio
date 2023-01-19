import Game from "@Components/igdb/Game";

import { BountyProps } from "@Props";

const Page = ({ bounty }: BountyProps) => (
    <div>
        <section>
            <div className="mb-9">
                <Game {...bounty.game} />
            </div>

            <div>
                <h2>Bounty Details</h2>

                <p className="mb-0 whitespace-pre-line">{bounty.details}</p>
            </div>
        </section>
    </div>
);

export default Page;
