import Link from "next/link";

import { Game } from "@Types";

const Component = ({ cover, id, released, title }: Game) => (
    <div className="game">
        <Link className="fade-link" href={`/game/${id}`} tabIndex={-1}>
            <img className="game__image" alt={`${title} cover`} src={cover} />
        </Link>

        <div>
            <Link className="fade-link game__title" href={`/game/${id}`}>
                {title}
            </Link>

            <div className="game__released">{released}</div>
        </div>
    </div>
);

export default Component;
