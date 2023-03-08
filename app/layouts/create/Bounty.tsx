import { useState } from "react";

import { useRouter } from "next/router";

import Button from "@Components/inputs/Button";
import Game from "@Components/Game";
import Input from "@Components/inputs/Input";
import TextArea from "@Components/inputs/TextArea";

import { CreateBountyProps } from "@Props";

type State = {
    details: string;
    discord_link: string;
    end_date: string;
    start_date: string;
};

const create_bounty = async (body: string) => {
    const response = await fetch(`/api/bounty/create`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Page = ({ game }: CreateBountyProps) => {
    const router = useRouter();

    const [state, set_state] = useState<State>({
        details: "",
        discord_link: "",
        end_date: "",
        start_date: "",
    });

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_change = (key: string, value: string) =>
        set_state({
            ...state,
            [key]: value,
        });

    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        set_is_loading(true);

        const { bounty_id } = await create_bounty(
            JSON.stringify({
                details: state.details,
                discord_link: state.discord_link.length ? state.discord_link : null,
                end_date: state.end_date || null,
                game_id: game.id,
                start_date: state.start_date || null,
            })
        );

        if (bounty_id) {
            router.push(`/bounty/${bounty_id}`);
            return;
        }

        set_is_loading(false);
    };

    return (
        <div>
            <section>
                <h1>Create Bounty</h1>

                <div>
                    <div className="mb-8">
                        <Game {...game} />
                    </div>

                    <form className="space-y-8" onSubmit={handle_submit}>
                        <TextArea id="details" label="Bounty Details" handle_change={handle_change} max_length={1024} required={true} value={state.details} />

                        <Input
                            handle_change={handle_change}
                            id="discord_link"
                            label="Optional Discord Server"
                            placeholder="https://discord.gg/7cZvW3AZ7M"
                            required={false}
                            type="url"
                            value={state.discord_link}
                        />

                        <div className="grid grid-cols-2 space-x-8">
                            <Input handle_change={handle_change} id="start_date" label="Start Date" required={false} type="date" value={state.start_date} />

                            <Input handle_change={handle_change} id="end_date" label="End Date" required={false} type="date" value={state.end_date} />
                        </div>

                        <Button is_disabled={!state.details.length} is_loading={is_loading} text="Create Bounty" />
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Page;
