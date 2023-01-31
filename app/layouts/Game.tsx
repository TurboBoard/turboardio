import Bounties from "@Components/bounties/Bounties";

import { GameProps } from "@Props";

const Page = ({ bounties, game }: GameProps) => (
    <div>
        <section>
            <div className="mb-9">
                <div className="game">
                    <img className="game__image" alt={`${game.title} cover`} src={game.cover} />

                    <div>
                        <div className="game__title">{game.title}</div>

                        <div className="game__released">{game.released}</div>
                    </div>
                </div>
            </div>

            <div>
                <h2>Bounties</h2>

                <Bounties bounties={bounties} />
            </div>
        </section>
    </div>
);

export default Page;
