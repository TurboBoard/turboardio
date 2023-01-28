import Game from "@Components/igdb/Game";
import Search from "@Components/igdb/Search";
import X from "@Svgs/X";

import { Game as GameType } from "@Types";

const Component = ({ game, set_game }: { game: GameType | null; set_game: Function }) => {
    if (game) {
        return (
            <div className="flex space-x-5">
                <Game {...game} />

                <button className="highlight-link h-7 w-7" onClick={() => set_game(null)}>
                    <X />
                </button>
            </div>
        );
    }

    return <Search set_game={set_game} />;
};

export default Component;
