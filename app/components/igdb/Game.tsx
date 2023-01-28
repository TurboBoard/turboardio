import Link from "next/link";

import { Game } from "@Types";

const Component = ({ cover, id, released, title }: Game) => (
    <div className="game">
        <img className="game__image" alt={`${title} cover`} src={cover} />

        <div>
            <Link href={`/game/${id}`}>
                <a className="game__title highlight-link">{title}</a>
            </Link>

            <div className="game__released">{released}</div>
        </div>
    </div>
);

export default Component;
