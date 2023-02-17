import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import Form from "@Forms/Contact";

const send_email = async (body: string) => {
    const response = await fetch(`/api/email/contact`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Component = () => {
    const { user } = useUser();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const [success, set_success] = useState<boolean>(false);

    const handle_send = async ({ email, message }: { email: string; message: string }) => {
        set_is_loading(true);

        const { success } = await send_email(
            JSON.stringify({
                email,
                message,
            })
        );

        if (success) {
            set_success(success);
        }

        set_is_loading(false);
    };

    return (
        <section className="md:w-2/3 md:mx-auto">
            <div className="mb-8 text-center">
                <h1>Get In Touch</h1>

                {/* prettier-ignore */ }
                <p>
				    Are you looking to sponsor a bounty? Would you like to advertise your game? Need help organizing a bounty for your community?<br />Fill out the form below or email us at <a className="generic-link" href="mailto:hello@turboboard.io" target="_blank">hello@turboboard.io</a> and we'll help you out.
			    </p>
            </div>

            {success ? (
                <p className="text-center">Thank you for getting in touch! We'll get back to you as soon as we can.</p>
            ) : (
                <Form email={user?.email || null} handle_send={handle_send} is_loading={is_loading} />
            )}
        </section>
    );
};

export default Component;
