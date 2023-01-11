import { useState } from "react";

import Form from "@Components/forms/UserImage";

import { debounce } from "lodash";

import { TurboardioUser } from "@Types";

const _update_user_image = async (form_data: any, set_is_loading: Function) => {
    const response = await fetch(`/api/user/update_image`, {
        method: "POST",
        body: form_data,
    });

    const json = await response.json();

    console.log("json response", json);

    set_is_loading(false);
};

const update_user_image = debounce(_update_user_image, 250);

const Component = ({ user_id }: { user_id: TurboardioUser["user_id"] }) => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_update = async (file: any) => {
        set_is_loading(true);

        let form_data = new FormData();

        form_data.append("file", file);

        await update_user_image(form_data, set_is_loading);
    };

    return (
        <div>
            <h2>User Image</h2>

            <div className="mb-6">
                <img alt="User Image" className="user-image" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />
            </div>

            <Form handle_update={handle_update} is_loading={is_loading} />
        </div>
    );
};

export default Component;
