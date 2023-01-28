import { useEffect, useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { User } from "@Types";

type State = {
    email: string;
    message: string;
};

const Form = ({ email, handle_send, is_loading }: { email: User["email"] | null; handle_send: Function; is_loading: boolean }) => {
    const [state, set_state] = useState<State>({
        email: email || "",
        message: "",
    });

    useEffect(() => {
        if (!email) return;

        handle_change("email", email);
    }, [email]);

    const handle_change = (key: "email" | "message", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_send(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <TextArea handle_change={handle_change} id="message" label="How can we help you?" max_length={1024} placeholder="What's up..." required={true} value={state.message} />

            <Input handle_change={handle_change} id="email" label="Your email" placeholder="ryu@streetfighter.com" required={true} type="email" value={state.email} />

            <Button is_disabled={!state.message.length || !state.email.length} is_loading={is_loading} text="Get In Touch" />
        </form>
    );
};

export default Form;
