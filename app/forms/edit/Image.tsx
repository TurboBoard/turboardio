import { useState } from "react";

import Button from "@Components/inputs/Button";

const Form = ({ handle_edit, is_loading }: { handle_edit: Function; is_loading: boolean }) => {
    const [file, set_file] = useState(null);

    const handle_change = (e: React.FormEvent<HTMLInputElement>) => set_file((e.target as HTMLInputElement).files[0]);

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let form_data = new FormData();

        form_data.append("user_image", file);

        handle_edit(form_data);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <div>
                <label className="text-sm">For best results, image should be 256x256</label>

                <input className="border-b-0" onChange={handle_change} type="file" />
            </div>

            <Button is_disabled={is_loading || !file} is_loading={is_loading} text="Update Image" />
        </form>
    );
};

export default Form;
