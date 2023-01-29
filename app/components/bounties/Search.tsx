import { useState } from "react";

import Bounties from "@Components/bounties/Bounties";
import Input from "@Components/inputs/Input";

const Component = ({ bounties }) => {
    const [query, set_query] = useState<string>("");

    const handle_change = (key, value) => set_query(value);

    const filtered_bounties = query.length
        ? bounties.filter(({ game }) =>
              game.title
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(query)
          )
        : null;

    return (
        <div>
            <Input handle_change={handle_change} id="query" label="Search by Game Title" placeholder="Legend of Zelda, Super Mario 64, Mega Man, etc..." value={query} />

            {filtered_bounties && (
                <div className="mt-5">
                    <Bounties bounties={filtered_bounties} />
                </div>
            )}
        </div>
    );
};

export default Component;
