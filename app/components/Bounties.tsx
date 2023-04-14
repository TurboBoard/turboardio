import BountiesItem from "@Components/BountiesItem";

import { Bounties } from "@Types";

const Component = ({ bounties }: { bounties: Bounties }) => (
    <div className="divide-y">
        {bounties.map((bounties_item) => (
            <BountiesItem key={bounties_item.id} {...bounties_item} />
        ))}
    </div>
);

export default Component;
