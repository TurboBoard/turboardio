import { TurboardioUserContext } from "@Context/TurboardioUser";

import Edit from "@Components/edit/Image";
import Loading from "@Components/Loading";

const Layout = () => (
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
                    <h1>Your Image</h1>

                    <Edit turboardio_user_id={turboardio_user.id} />
                </section>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Layout;
