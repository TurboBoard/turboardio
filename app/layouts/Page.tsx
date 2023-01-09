import { rte } from "@Lib";

import { PageProps } from "@Props";

const Page = ({ content, title }: PageProps) => (
    <div>
        <section className="rte">
            <h1>{title}</h1>

            <div>{rte(content)}</div>
        </section>
    </div>
);

export default Page;
