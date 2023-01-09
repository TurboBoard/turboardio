import Form from "@Components/forms/CreateBounty";

import { CreateBountyProps } from "@Props";

const Page = ({ user }: CreateBountyProps) => (
    <div>
        <section>
            <h1>Create Bounty</h1>

            <Form />
        </section>
    </div>
);

export default Page;
