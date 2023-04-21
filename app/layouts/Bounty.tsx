import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import Bounty from "@Components/Bounty";
import Pledge from "@Components/Pledge";

import ArrowUpRight from "@Svgs/ArrowUpRight";
import Edit from "@Svgs/Edit";
import Trash from "@Svgs/Trash";

import { BountyProps } from "@Props";

const Layout = ({ bounty }: BountyProps) => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => (
            <div>
                {/* Bounty Information */}
                <section>
                    <Bounty {...bounty} />
                </section>

                <div className="gutter">
                    <hr />
                </div>

                {/* Claims */}
                <section>
                    <h2>Claims</h2>

                    {bounty.claims ? (
                        <div className="divide-y">
                            {bounty.claims.map(({ comment, created_at, id, is_winner, link, user }) => {
                                const is_admin = turboardio_user?.id === user.id;

                                return (
                                    <div key={id} className="relative py-7">
                                        {is_winner && (
                                            <div className="jumbo">
                                                <div className="jumbo__text">winner</div>
                                            </div>
                                        )}

                                        <div className="sm:flex">
                                            <div className="sm:flex-1 flex justify-center sm:justify-start mb-6">
                                                <img
                                                    alt={`{user.name} profile picture`}
                                                    className="circle-image h-10 w-10 lg:h-11 lg:w-11"
                                                    src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`}
                                                />
                                            </div>

                                            <div className="sm:flex-1 sm:flex sm:items-center">{comment && <p className="w-3/4 mx-auto text-center whitespace-pre-line">{comment}</p>}</div>

                                            <div className="absolute top-7 right-0 sm:static sm:flex-1">
                                                <div className="flex justify-end space-x-6 lg:space-x-7 text-byzantium">
                                                    <a className="fade-link block h-7 lg:h-8" href={link} target="_blank">
                                                        <ArrowUpRight />
                                                    </a>

                                                    {is_admin && !bounty.is_locked && (
                                                        <>
                                                            <Link className="fade-link" href={`/edit/claim/${id}`}>
                                                                <span className="block h-7 lg:h-8">
                                                                    <Edit />
                                                                </span>
                                                            </Link>

                                                            <Link className="fade-link" href={`/delete/claim/${id}`}>
                                                                <span className="block h-7 lg:h-8">
                                                                    <Trash />
                                                                </span>
                                                            </Link>
                                                        </>
                                                    )}
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
                                );
                            })}
                        </div>
                    ) : (
                        <p>There are no claims on this bounty.</p>
                    )}

                    {!bounty.is_locked && (
                        <Link className="button button--anchor" href={`/create/claim/${bounty.id}`}>
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

                    {bounty.pledges ? (
                        <div className="flex space-x-7 mb-7">
                            {bounty.pledges.map(({ amount, id, user_id }) => {
                                const is_admin = turboardio_user?.id === user_id;

                                return (
                                    <div key={id} className="relative">
                                        <Pledge amount={amount} user_id={user_id} />

                                        {is_admin && !bounty.is_locked && (
                                            <Link className="fade-link absolute -top-5 -right-5 text-highlight" href={`/delete/pledge/${id}`}>
                                                <span className="block h-6.5">
                                                    <Trash />
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>There are no pledges on this bounty.</p>
                    )}

                    {!bounty.is_locked && (
                        <Link className="button button--anchor" href={`/create/pledge/${bounty.id}`}>
                            Create Pledge
                        </Link>
                    )}
                </section>
            </div>
        )}
    </TurboardioUserContext.Consumer>
);

export default Layout;
