import Contact from "@Components/email/Contact";
import Information from "@Components/home/Information";

import { HomeProps } from "@Props";

const Page = ({}: HomeProps) => (
    <div>
        <Information />

        <Contact />
    </div>
);

export default Page;
