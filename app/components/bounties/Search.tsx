import { useRouter } from "next/router";

import Search from "@Components/igdb/Search";

import { Game } from "@Types";

const Component = () => {
    const router = useRouter();

    const set_game = ({ id }: Game) => {
        router.push(`/game/${id.toString()}`);
    };

    return (
        <div>
            <Search set_game={set_game} />
        </div>
    );
};

export default Component;
