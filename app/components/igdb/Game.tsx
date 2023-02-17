import Link from "next/link";

import { Game } from "@Types";

const Component = ({ cover, id, released, title }: Game) => (
    <div className="game">
        <Link className="fade-link" href={`/game/${id}`}>
            <img className="game__image" alt={`${title} cover`} src={cover} />
        </Link>

        <div>
            <div className="game__title">{title}</div>

            <div className="game__released">{released}</div>
        </div>
    </div>
);

export default Component;
