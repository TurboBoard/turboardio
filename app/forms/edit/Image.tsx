import { useState } from "react";

import Button from "@Components/inputs/Button";

import { TurboardioUser } from "@Types";

import { blur } from "@Lib";

const update_image = async (form_data: any) => {
    const response = await fetch(`/api/edit/image`, {
        method: "POST",
        body: form_data,
    });

    return await response.json();
};

const Form = ({ turboardio_user_id }: { turboardio_user_id: TurboardioUser["id"] }) => {
    const [file, set_file] = useState(null);

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [success, set_success] = useState<boolean>(false);

    const handle_change = (e: React.FormEvent<HTMLInputElement>) => set_file((e.target as HTMLInputElement).files[0]);

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        blur();

        if (is_loading) return;

        set_is_loading(false);

        let form_data = new FormData();

        form_data.append("user_image", file);

        const { success } = await update_image(form_data);

        if (success) {
            set_success(success);

            return;
        }

        set_is_loading(false);

        set_file(null);
    };

    if (success) {
        return (
            <div>
                <h2>User Image</h2>

                <p>Your image is processing and will update shortly.</p>
            </div>
        );
    }

    return (
        <div>
            <img alt="Your Image" className="circle-image mb-7" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${turboardio_user_id}.jpg`} />

            <form className="space-y-8" onSubmit={handle_submit}>
                <div>
                    <label className="text-sm">For best results, image should be 256x256</label>

                    <input className="border-b-0" onChange={handle_change} type="file" />
                </div>

                <Button is_disabled={is_loading || !file} is_loading={is_loading} text="Update Image" />
            </form>
        </div>
    );
};

export default Form;
