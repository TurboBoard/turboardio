import Link from "next/link";

import { Game } from "@Types";

const Component = ({ game: { cover, developers, platforms, released, title }, href }: { game: Game; href: string | null }) => (
    <div className="game">
        {href ? (
            <Link className="fade-link shrink-0" href={href} tabIndex={-1}>
                <img className="game__image" alt={`${title} cover`} src={cover} />
            </Link>
        ) : (
            <img className="game__image" alt={`${title} cover`} src={cover} />
        )}

        <div>
            {href ? (
                <Link className="fade-link game__title" href={href}>
                    {title}
                </Link>
            ) : (
                <div className="game__title">{title}</div>
            )}

            <ul className="game__details">
                <li>
                    <strong>Released:</strong> <span>{released}</span>
                </li>
                <li>
                    <strong>Platforms:</strong> <span>{platforms}</span>
                </li>
                {developers && (
                    <li>
                        <strong>Developers:</strong> <span>{developers}</span>
                    </li>
                )}
            </ul>
        </div>
    </div>
);

export default Component;
