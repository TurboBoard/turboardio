import ArrowUpRight from "@Svgs/ArrowUpRight";

import { Bounty, Claim } from "@Types";

const Component = ({ claims, winning_claim_id }: { claims: Bounty["claims"]; winning_claim_id: Claim["id"] }) => {
    if (!claims) {
        return <p className="mb-0">There are currently no claims for this bounty.</p>;
    }

    return (
        <div className="divide-y">
            {claims.map(({ comment, created_at, id, link, user }) => (
                <div key={id} className="relative py-7">
                    {id === winning_claim_id && (
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
    );
};

export default Component;
