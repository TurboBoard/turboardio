import Link from "next/link";

import Game from "@Components/Game";

import Countdown from "@Components/Countdown";

import { Bounty } from "@Types";

const Component = ({ amount, end_date, game, id }: Bounty) => (
    <div>
        <div className="divider divider--left-down bg-pink" />

        <section className="bg-pink">
            <div className="lg:w-2/3 lg:mx-auto">
                <h1 className="text-white text-center">Featured Bounty</h1>

                <div className="md:flex md:items-center space-y-7">
                    <div className="game game--light">
                        <Link className="fade-link" href={`/bounty/${id}`} tabIndex={-1}>
                            <img className="game__image" alt={`${game.title} cover`} src={game.cover} />
                        </Link>

                        <div>
                            <Link className="fade-link game__title" href={`/bounty/${id}`}>
                                {game.title}
                            </Link>

                            <div className="game__released">{game.released}</div>

                            <div className="heading text-light text-2xl">
                                <div className="">Expires In:</div>

                                <Countdown end_date={end_date} />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link className="fade-link heading text-light text-5xl md:text-6xl" href={`/bounty/${id}`}>
                            ${amount}
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <div className="divider divider--right-up -mt-1 bg-pink" />
    </div>
);

export default Component;

// <div className="lg:flex lg:justify-center lg:items-center text-white">
//                     <div className="featured-game flex-1">
//                         <div className="game">
//                             <Link className="fade-link" href={`/bounty/${id}`} tabIndex={-1}>
//                                 <img alt={`{game.title} cover`} className="game__image" src={game.cover} />
//                             </Link>

//                             <div>
//                                 <Link className="game__title fade-link" href={`/bounty/${id}`} tabIndex={-1}>
//                                     {game.title}
//                                 </Link>

//                                 <div className="game__released">{game.released}</div>

//                                 <div className="flex items-center space-x-5">
//                                     <div className="heading text-2xl">Expires In:</div>

//                                     <div className="text-lg font-bold leading-loose">
//                                         <Countdown end_date={end_date} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex-1 text-right">
//                         <Link className="fade-link heading text-light text-5xl lg:text-6xl" href={`/bounty/${id}`}>
//                             ${amount}
//                         </Link>
//                     </div>
//                 </div>
