import CreateBounty from "@Components/create/Bounty";

import { CreateBountyProps } from "@Props";

const Layout = ({ game }: CreateBountyProps) => (
    <section>
        <h1>Create Bounty</h1>

        <CreateBounty game={game} />
    </section>
);

export default Layout;
