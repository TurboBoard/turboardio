import User from "@Components/user/User";

import { HomeProps } from "@Props";

const Component = ({ leaderboard }: { leaderboard: HomeProps["leaderboard"] }) => (
    <div className="space-y-7">
        {leaderboard.map(({ prize, user }) => (
            <div key={user.id} className="flex justify-between">
                <User {...user} />

                <div className="hidden sm:block heading text-accent text-5xl">${prize}</div>
            </div>
        ))}
    </div>
);

export default Component;
