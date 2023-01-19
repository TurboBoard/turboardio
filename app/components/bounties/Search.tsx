import Select from "@Components/igdb/Select";

import { Game } from "@Types";

const Component = () => {
    const handle_set_game = async (game: Game | null) => {
        console.log("game", game);
    };

    return (
        <div className="space-y-8">
            <Select game={null} set_game={handle_set_game} />
        </div>
    );
};

export default Component;
