import UserDetails from "@Components/account/UserDetails";

import { AccountProps } from "@Props";

const Page = ({ user }: AccountProps) => (
    <div>
        <section>
            <h1>Welcome</h1>

            <UserDetails email={user.email} turboardio_user_id={user.turboardio_user_id} />
        </section>
    </div>
);

export default Page;
