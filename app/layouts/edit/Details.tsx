import { TurboardioUserContext } from "@Context/TurboardioUser";

import Details from "@Forms/edit/Details";
import Loading from "@Components/Loading";

import { EditDetailsProps } from "@Props";

const Layout = ({ user: { email } }: EditDetailsProps) => (
    <TurboardioUserContext.Consumer>
        {({ turboardio_user }) => {
            if (!turboardio_user)
                return (
                    <section>
                        <Loading />
                    </section>
                );

            return (
                <section>
                    <h1>Your Profile</h1>

                    <Details
                        email={email}
                        initial_state={{
                            name: turboardio_user.name,
                            pronouns: turboardio_user.pronouns || "",
                            src_handle: turboardio_user.src_handle || "",
                            twitch_handle: turboardio_user.twitch_handle || "",
                            twitter_handle: turboardio_user.twitter_handle || "",
                        }}
                    />
                </section>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Layout;
