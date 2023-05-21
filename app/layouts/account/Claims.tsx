import { useEffect, useState } from "react";

import Link from "next/link";

import Claim from "@Components/Claim";
import Loading from "@Components/Loading";

import { ClaimsItem } from "@Types";

const get_claims = async (set_claims: Function) => {
    const response = await fetch("/api/get/account_claims");

    const { claims } = await response.json();

    if (claims) {
        set_claims(claims);
    }
};

const Layout = () => {
    const [claims, set_claims] = useState<ClaimsItem[] | null>(null);

    useEffect(() => {
        get_claims(set_claims);
    }, []);

    if (!claims)
        return (
            <section>
                <div className="h-[30vw]">
                    <Loading />
                </div>
            </section>
        );

    if (!claims.length) {
        return (
            <section>
                <h1 className="mb-7">Your Claims</h1>

                <p>You currently do not have any claims.</p>
            </section>
        );
    }

    return (
        <section>
            <h1 className="mb-7">Your Claims</h1>

            <div className="divide-y divide-silver">
                {claims.map((item) => (
                    <div className="mb-8" key={item.id}>
                        <Claim {...item} />

                        <div className="account-buttons">
                            <Link className="button fade-link inline-block" href={`/bounty/${item.bounty_id}`}>
                                View Bounty
                            </Link>

                            <Link className="button fade-link inline-block" href={`/edit/claim/${item.id}`}>
                                Edit Claim
                            </Link>

                            <Link className="button fade-link inline-block" href={`/delete/claim/${item.id}`}>
                                Delete Claim
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Layout;
