import ArrowUpRight from "@Svgs/ArrowUpRight";
import Claim from "@Forms/create/Claim";
import Game from "@Components/Game";
import Pledge from "@Forms/create/Pledge";

import { LinkItUrl } from "react-linkify-it";

import { BountyProps } from "@Props";

import { format } from "@Lib";

const Page = ({ bounty: { admin, amount, claims, created_at, details, end_date, game, id, is_claimed, pledges, start_date } }: BountyProps) => (
    <div>
        {/* The Game and Bounty Details are always shown */}
        <section>
            <div className="flex justify-between mb-9">
                <Game {...game} />

                {amount && (
                    <div className="hidden sm:block">
                        <div className="heading text-accent text-4xl lg:text-6xl">${amount}</div>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                <div>
                    <h2>Details</h2>

                    <div className="rte">
                        <LinkItUrl>
                            <p className="whitespace-pre-line">{details}</p>
                        </LinkItUrl>
                    </div>

                    <div>
                        {/* prettier-ignore */}
                        <small>
                            Bounty created on {created_at} by <span className="text-black">{admin.name}</span>
                        </small>
                    </div>
                </div>

                {(start_date || end_date) && (
                    <div className="grid grid-cols-2 space-x-8">
                        {start_date && (
                            <div>
                                <h3>Start Date</h3>

                                <p>{format.iso(start_date)}</p>
                            </div>
                        )}

                        {end_date && (
                            <div>
                                <h3>End Date</h3>

                                <p>{format.iso(end_date)}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>

        <div className="gutter">
            <hr />
        </div>

        {/* Only show claims if there are claims */}
        {claims && (
            <>
                <section>
                    <h2>Claims</h2>

                    <div className="divide-y">
                        {claims.map(({ comment, created_at, id, is_winner, link, user }) => (
                            <div key={id} className="relative py-7">
                                {is_winner && (
                                    <div className="jumbo">
                                        <div className="jumbo__text">winner</div>
                                    </div>
                                )}

                                <div className="sm:flex sm:items-center">
                                    <div className="shrink-0 flex justify-center sm:justify-start mb-5 sm:mb-0">
                                        <img alt={`{user.name} profile picture`} className="circle-image h-10 w-10 lg:h-11 lg:w-11" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />
                                    </div>

                                    {comment && <p className="w-3/4 mx-auto text-center whitespace-pre-line">{comment}</p>}

                                    <div className="shrink-0">
                                        <div className="absolute top-7 right-0">
                                            <a className="highlight-link block h-7 lg:h-8" href={link} target="_blank">
                                                <ArrowUpRight />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    {/* prettier-ignore */}
                                    <small>
                                Claim submitted on {created_at} by <span className="text-copy">{user.name}</span>
                            </small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="gutter">
                    <hr />
                </div>
            </>
        )}

        {/* Only show the claim form if the bounty has not been claimed */}
        {!is_claimed && (
            <>
                <section>
                    <h2>Claim</h2>

                    <Claim bounty_id={id} />
                </section>

                <div className="gutter">
                    <hr />
                </div>
            </>
        )}

        {/* Only show pledges if there are pledges */}
        {pledges && (
            <>
                <section>
                    <h2>Pledges</h2>

                    <div className="flex space-x-7">
                        {pledges.map(({ amount, id, user_id }) => (
                            <div key={id} className="text-center">
                                <img alt="User profile picture" className="circle-image h-10 w-10 mx-auto mb-5" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />

                                <div className="heading text-accent text-4xl">${amount}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="gutter">
                    <hr />
                </div>
            </>
        )}

        {/* Only show pledge form if the bounty has not been claimed */}
        {!is_claimed && (
            <>
                <section>
                    <h2>Pledge</h2>

                    <Pledge bounty_id={id} />
                </section>
            </>
        )}
    </div>
);

export default Page;
