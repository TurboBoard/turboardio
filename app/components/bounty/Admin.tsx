import Link from "next/link";

import { Bounty } from "@Types";

const Component = ({ bounty_id }: { bounty_id: Bounty["id"] }) => (
    <section>
        <h2>Admin Area</h2>

        <div>
            <Link className="button fade-link block text-center" href={`/edit/${bounty_id}`}>
                Edit Bounty
            </Link>
        </div>
    </section>
);

export default Component;
