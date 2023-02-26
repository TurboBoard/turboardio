import User from "@Components/user/User";

import { Winners } from "@Types";

const Component = ({ winners }: { winners: Winners }) => (
    <div className="space-y-7">
        {winners.map(({ amount, user }) => (
            <div key={user.id} className="flex justify-between">
                <User {...user} />

                <div className="hidden sm:block heading text-accent text-5xl">${amount}</div>
            </div>
        ))}
    </div>
);

export default Component;
