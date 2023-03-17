import Link from "next/link";

import { TurboardioUserContext } from "@Context/TurboardioUser";

import { Bounty, TurboardioUser } from "@Types";

const Component = ({ admin_id, bounty_id }: { admin_id: TurboardioUser["id"]; bounty_id: Bounty["id"] }) => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => {
            if (turboardio_user?.id !== admin_id) return null;

            return (
                <>
                    <div className="gutter">
                        <hr />
                    </div>

                    <section>
                        <h2>Settings</h2>

                        <p>Select bounty winner.</p>

                        <Link className="button button--anchor fade-link inline-block mb-7" href={`/create/winners/${bounty_id}`}>
                            Select Winner
                        </Link>

                        <p>Edit or delete your bounty.</p>

                        <Link className="button button--anchor fade-link inline-block" href={`/edit/bounty/${bounty_id}`}>
                            Edit Bounty
                        </Link>
                    </section>
                </>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Component;
