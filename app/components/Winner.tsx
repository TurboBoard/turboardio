import User from "@Components/User";

import { Winner } from "@Types";

const Component = ({ amount, user }: Winner) => (
    <div key={user.id} className="flex justify-between items-center">
        <User {...user} />

        <div className="hidden xs:block heading text-accent text-4xl 2xl:text-5xl">${amount}</div>
    </div>
);

export default Component;
