import { useState } from "react";

import Form from "@Components/forms/UserImage";

import { TurboardioUser } from "@Types";

type State = {
    is_loading: boolean;
    success: boolean;
};

const update_image = async (form_data: any) => {
    const response = await fetch(`/api/user/update_image`, {
        method: "POST",
        body: form_data,
    });

    return await response.json();
};

const Component = ({ user }: { user: TurboardioUser }) => {
    const [state, set_state] = useState<State>({
        is_loading: false,
        success: false,
    });

    const handle_update = async (file: any) => {
        set_state({
            is_loading: true,
            success: false,
        });

        let form_data = new FormData();

        form_data.append("user_image", file);

        const { success } = await update_image(form_data);

        set_state({
            is_loading: false,
            success,
        });
    };

    if (state.success) {
        return (
            <div>
                <h2>User Image</h2>

                <p>Your image is processing and will update shortly.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Your Image</h2>

            <img alt="Your Image" className="circle-image mb-7" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />

            <Form handle_update={handle_update} is_loading={state.is_loading} />
        </div>
    );
};

export default Component;
