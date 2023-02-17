import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/account/edit/Details";

import { TurboardioUser, User } from "@Types";

const edit_details = async (body: string) => {
    const response = await fetch("/api/account/edit/details", {
        method: "post",
        body,
    });

    return await response.json();
};

const Component = ({ email, user }: { email: User["email"]; user: TurboardioUser }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async (state: { name: string; pronouns: string | null; src_handle: string | null; twitch_handle: string | null; twitter_handle: string | null }) => {
        set_is_loading(true);

        const { success } = await edit_details(
            JSON.stringify({
                name: state.name,
                pronouns: state.pronouns.length ? state.pronouns : null,
                src_handle: state.src_handle.length ? state.src_handle : null,
                twitch_handle: state.twitch_handle.length ? state.twitch_handle : null,
                twitter_handle: state.twitter_handle.length ? state.twitter_handle : null,
            })
        );

        if (success) {
            router.push(`/account`);

            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <h2>Your Details</h2>

            <Form
                email={email}
                handle_edit={handle_edit}
                initial_state={{
                    name: user.name,
                    pronouns: user.pronouns || "",
                    src_handle: user.src_handle || "",
                    twitch_handle: user.twitch_handle || "",
                    twitter_handle: user.twitter_handle || "",
                }}
                is_loading={is_loading}
            />
        </div>
    );
};

export default Component;
