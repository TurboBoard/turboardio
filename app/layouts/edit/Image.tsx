import { TurboardioUserContext } from "@Context/TurboardioUser";

import Image from "@Forms/edit/Image";
import Loading from "@Components/Loading";

import { EditImageProps } from "@Props";

const Layout = ({}: EditImageProps) => (
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

                    <Image turboardio_user_id={turboardio_user.id} />
                </section>
            );
        }}
    </TurboardioUserContext.Consumer>
);

export default Layout;
