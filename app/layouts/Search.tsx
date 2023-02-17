import Search from "@Components/igdb/Search";

import { SearchProps } from "@Props";

const Page = ({}: SearchProps) => (
    <div>
        <section>
            <h1>Game Search</h1>

            <Search />
        </section>
    </div>
);

export default Page;
