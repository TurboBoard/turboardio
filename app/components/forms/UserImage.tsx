import { useState } from "react";

import Button from "@Components/inputs/Button";

import { blur } from "@Lib";

const Form = ({ handle_update, is_loading }: { handle_update: Function; is_loading: boolean }) => {
    const [file, set_file] = useState(null);

    // @ts-ignore
    const handle_change = (e: React.FormEvent<HTMLInputElement>) => set_file(e.target.files[0]);

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        blur();

        if (is_loading) return;

        handle_update(file);

        set_file(null);
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
