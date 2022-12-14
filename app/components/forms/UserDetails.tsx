import { useState } from "react";

import Input from "@Components/inputs/Input";

import { TurboardioUser } from "@Types";

import { blur } from "@Lib";

type State = {
    image_id: TurboardioUser["image_id"];
    pronouns: TurboardioUser["pronouns"];
    src_handle: TurboardioUser["src_handle"];
    twitch_handle: TurboardioUser["twitch_handle"];
    twitter_handle: TurboardioUser["twitter_handle"];
    user_name: TurboardioUser["user_name"];
};

const Form = ({ email, handle_update, turboardio_user }: { email: string; handle_update: Function; turboardio_user: TurboardioUser }) => {
    const [state, set_state] = useState<State>({
        image_id: turboardio_user.image_id,
        pronouns: turboardio_user.pronouns || "",
        src_handle: turboardio_user.src_handle || "",
        twitch_handle: turboardio_user.twitch_handle || "",
        twitter_handle: turboardio_user.twitter_handle || "",
        user_name: turboardio_user.user_name,
    });

    const handle_change = (key: "image_id" | "user_name", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_update(state);

        blur();
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input disabled={true} id="email" label="Email Address" required={true} type="email" value={email} />

            <Input handle_change={handle_change} id="user_name" label="User Name" placeholder="Gamer" required={true} value={state.user_name} />

            <Input handle_change={handle_change} id="pronouns" label="Pronouns" max_length={64} placeholder="They/She/He" value={state.pronouns} />

            <Input handle_change={handle_change} id="src_handle" label="Speedrun.com Handle" value={state.src_handle} />

            <Input handle_change={handle_change} id="twitch_handle" label="Twitch.tv Handle" value={state.twitch_handle} />

            <Input handle_change={handle_change} id="twitter_handle" label="Twitter.com Handle" value={state.twitter_handle} />

            <h3>User Image</h3>
            <img alt="User Image" className="user-image" src={`https://${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${state.image_id}.jpg`} />

            <input name="user-image" accept="image/png, image/jpeg" type="file" />

            <button className="button w-full">Update</button>
        </form>
    );
};

export default Form;
