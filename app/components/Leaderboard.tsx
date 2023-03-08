import User from "@Components/User";

import { Leaderboard } from "@Types";

const Component = ({ leaderboard }: { leaderboard: Leaderboard }) => (
    <div className="space-y-7">
        {leaderboard.map(({ amount, user }) => (
            <div key={user.id} className="flex justify-between">
                <User {...user} />

                <div className="hidden sm:block heading text-accent text-5xl">${amount}</div>
            </div>
        ))}
    </div>
);

export default Component;
