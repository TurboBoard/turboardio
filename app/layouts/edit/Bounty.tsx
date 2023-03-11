import Form from "@Forms/edit/Bounty";

import { EditBountyProps } from "@Props";

const Page = ({ bounty: { details, end_date, start_date } }: EditBountyProps) => (
    <section>
        <h1>Edit Bounty</h1>

        <Form
            initial_state={{
                details,
                end_date: end_date || "",
                start_date: start_date || "",
            }}
        />
    </section>
);

export default Page;
