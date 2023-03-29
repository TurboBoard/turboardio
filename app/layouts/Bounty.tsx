import Link from "next/link";

import Bounty from "@Components/bounty/Bounty";

import ArrowUpRight from "@Svgs/ArrowUpRight";

import { BountyProps } from "@Props";

const Layout = ({ bounty: { admin, amount, claims, created_at, details, end_date, game, id, is_claimable, pledges, start_date } }: BountyProps) => (
    <div>
        {/* Bounty Information */}
        <section>
            <Bounty admin={admin} amount={amount} created_at={created_at} details={details} end_date={end_date} game={game} start_date={start_date} />
        </section>

        <div className="gutter">
            <hr />
        </div>

        {/* Claims */}
        <section>
            <h2>Claims</h2>

            {claims ? (
                <div className="divide-y">
                    {claims.map(({ comment, created_at, id, is_winner, link, user }) => (
                        <div key={id} className="relative py-7">
                            {is_winner && (
                                <div className="jumbo">
                                    <div className="jumbo__text">winner</div>
                                </div>
                            )}

                            <div className="sm:flex">
                                <div className="sm:flex-1 flex justify-center sm:justify-start mb-6">
                                    <img alt={`{user.name} profile picture`} className="circle-image h-10 w-10 lg:h-11 lg:w-11" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />
                                </div>

                                <div className="sm:flex-1 sm:flex sm:items-center">{comment && <p className="w-3/4 mx-auto text-center whitespace-pre-line">{comment}</p>}</div>

                                <div className="absolute top-7 right-0 sm:static sm:flex-1 sm:flex sm:justify-end sm:items-start">
                                    <a className="fade-link block h-7 lg:h-8 text-byzantium" href={link} target="_blank">
                                        <ArrowUpRight />
                                    </a>
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
            ) : (
                <p>There are currently no claims on this bounty.</p>
            )}

            {is_claimable && (
                <Link className="button button--anchor" href={`/create/claim/${id}`}>
                    Submit Claim
                </Link>
            )}
        </section>

        <div className="gutter">
            <hr />
        </div>

        {/* Pledges */}
        <section>
            <h2>Pledges</h2>

            {pledges ? (
                <div className="flex space-x-7 mb-7">
                    {pledges.map(({ amount, id, user_id }) => (
                        <div key={id} className="text-center">
                            <img alt="User profile picture" className="circle-image h-10 w-10 mx-auto mb-5" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />

                            <div className="heading text-accent text-4xl">${amount}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>There are currently no pledges on this bounty.</p>
            )}

            {
                // is_claimable && (
                //     <Link className="button button--anchor" href={`/create/pledge/${id}`}>
                //         Submit Pledge
                //     </Link>
                // )
            }
        </section>
    </div>
);

export default Layout;
