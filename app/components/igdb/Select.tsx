import X from "@Svgs/X";
import Game from "@Components/igdb/Game";
import Search from "@Components/igdb/Search";

import { Game as GameType } from "@Types";

const Component = ({ game, set_game }: { game: GameType | null; set_game: Function }) => {
    if (game) {
        return (
            <div className="relative">
                <div className="absolute z-10 opacity-0 focus:opacity-100 hover:opacity-100 in-out-smooth">
                    <button className="game__image flex justify-center items-center p-7 bg-highlight text-white" onClick={() => set_game(null)}>
                        <X />
                    </button>
                </div>

                {/* <Game {...game} /> */}
            </div>
        );
    }

    return <Search set_game={set_game} />;
};

export default Component;
