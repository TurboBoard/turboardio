import Profile from "@Components/user/Profile";

import { AccountProps } from "@Props";

const Page = ({ user }: AccountProps) => (
    <div>
        <section>
            <h1>Welcome</h1>

            <div className="mb-9">
                <Profile email={user.email} />
            </div>

            <div>
                <a className="button inline-block" href="/api/auth/logout">
                    Logout
                </a>
            </div>
        </section>
    </div>
);

export default Page;
