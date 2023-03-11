import { useState } from "react";

import Form from "@Forms/Contact";

import { ContactState } from "@States";

const send_email = async (body: string) => {
    const response = await fetch(`/api/email/contact`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = () => {
    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [success, set_success] = useState<boolean>(false);

    const handle_send = async ({ email, message }: ContactState) => {
        set_is_loading(true);

        const body: string = JSON.stringify({
            email,
            message,
        });

        const { success } = await send_email(body);

        set_success(success);
    };

    if (success) {
        return <p className="text-center">Thank you for getting in touch! We'll get back to you as soon as we can.</p>;
    }

    return (
        <div>
            {/* prettier-ignore */ }
            <p className="text-center">
                Are you looking to sponsor a bounty? Would you like to advertise your game? Need help organizing a bounty for your community?<br />Fill out the form below or email us at <a className="generic-link" href="mailto:hello@turboboard.io" target="_blank">hello@turboboard.io</a> and we'll help you out.
            </p>

            <Form handle_send={handle_send} is_loading={is_loading} />
        </div>
    );
};

export default Component;
