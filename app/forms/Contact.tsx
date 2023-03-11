import { useState } from "react";

import Button from "@Components/inputs/Button";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { ContactState } from "@States";

const Form = ({ handle_send, is_loading }: { handle_send: Function; is_loading: boolean }) => {
    const [state, set_state] = useState<ContactState>({
        email: "",
        message: "",
    });

    const handle_change = (key: "email" | "message", value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_send(state);
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Input handle_change={handle_change} id="email" label="Your email" placeholder="ryu@streetfighter.com" required={true} type="email" value={state.email} />

            <TextArea handle_change={handle_change} id="message" label="How can we help you?" max_length={1024} placeholder="What's up..." required={true} value={state.message} />

            <Button is_disabled={!state.message.length || !state.email.length} is_loading={is_loading} text="Get In Touch" />
        </form>
    );
};

export default Form;
