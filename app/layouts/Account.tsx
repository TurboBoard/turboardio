import UserProfile from "@Components/account/UserProfile";

import { UserProvider } from "@Context/User";

import { AccountProps } from "@Props";

const Page = ({ user }: AccountProps) => (
    <div>
        <section>
            <h1>Welcome</h1>

            <div className="mb-9">
                <UserProvider>
                    <UserProfile email={user.email} turboardio_user_id={user.turboardio_user_id} />
                </UserProvider>
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
