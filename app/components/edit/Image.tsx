import { useState } from "react";

import Form from "@Forms/edit/Image";

import { TurboardioUser } from "@Types";

const update_image = async (form_data: any) => {
    const response = await fetch(`/api/edit/image`, {
        method: "POST",
        body: form_data,
    });

    return await response.json();
};

const Component = ({ turboardio_user_id }: { turboardio_user_id: TurboardioUser["id"] }) => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [success, set_success] = useState<boolean>(false);

    const handle_edit = async (form_data: any) => {
        set_is_loading(true);

        const { success } = await update_image(form_data);

        if (success) {
            set_success(success);

            return;
        }

        set_is_loading(false);
    };

    if (success) {
        return <p>Your image is processing and will update shortly.</p>;
    }

    return (
        <div>
            <img alt="Your Image" className="circle-image mb-7" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${turboardio_user_id}.jpg`} />

            <Form handle_edit={handle_edit} is_loading={is_loading} />
        </div>
    );
};

export default Component;
