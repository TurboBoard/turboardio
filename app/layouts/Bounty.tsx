import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import Bounty from "@Components/Bounty";
import Claim from "@Components/Claim";
import Pledge from "@Components/Pledge";

import Edit from "@Svgs/Edit";
import Trash from "@Svgs/Trash";

import { BountyProps } from "@Props";

const Layout = ({ bounty }: BountyProps) => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => (
            <div>
                {/* Bounty Information */}
                <section className="relative">
                    <Bounty {...bounty} />

                    {turboardio_user?.id === bounty.admin.id && !bounty.is_locked && (
                        <div className="gutter absolute top-0 right-0">
                            <div className="flex justify-end space-x-5 lg:space-x-6 text-byzantium">
                                <Link className="fade-link" href={`/edit/bounty/${bounty.id}`}>
                                    <span className="block h-7">
                                        <Edit />
                                    </span>
                                </Link>

                                <Link className="fade-link" href={`/delete/bounty/${bounty.id}`}>
                                    <span className="block h-7">
                                        <Trash />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    )}
                </section>

                <div className="gutter">
                    <hr />
                </div>

                {/* Claims */}
                <section>
                    <h2>Claims</h2>

                    {bounty.claims ? (
                        <div className="divide-y">
                            {bounty.claims.map((claim) => {
                                const is_admin = turboardio_user?.id === claim.user.id;

                                return (
                                    <div key={claim.id} className="relative">
                                        <Claim {...claim} />

                                        {is_admin && !bounty.is_locked && (
                                            <div className="absolute top-7 sm:top-0 left-0 sm:left-auto sm:right-0">
                                                <div className="flex justify-end space-x-5 lg:space-x-6 text-byzantium">
                                                    <Link className="fade-link" href={`/edit/claim/${claim.id}`}>
                                                        <span className="block h-7">
                                                            <Edit />
                                                        </span>
                                                    </Link>

                                                    <Link className="fade-link" href={`/delete/claim/${claim.id}`}>
                                                        <span className="block h-7">
                                                            <Trash />
                                                        </span>
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
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
