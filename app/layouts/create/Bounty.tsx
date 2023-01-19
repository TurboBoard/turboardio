import CreateBounty from "@Components/create/Bounty";

import { CreateBountyProps } from "@Props";

const Page = ({}: CreateBountyProps) => (
    <div>
        <section>
            <h1>Create Bounty</h1>

            <CreateBounty />
        </section>
    </div>
);

export default Page;
