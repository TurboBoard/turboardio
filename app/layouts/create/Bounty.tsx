import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/bounty/Create";
import Game from "@Components/igdb/Game";

import { CreateBountyProps } from "@Props";

const create_bounty = async (body: string) => {
    const response = await fetch(`/api/bounty/create`, {
        method: "POST",
        body,
    });

    return await response.json();
};

const Page = ({ game }: CreateBountyProps) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_create = async ({ details, discord_link, end_date, start_date }: { details: string; discord_link: string; end_date: string; start_date: string }) => {
        set_is_loading(true);

        const { bounty_id } = await create_bounty(
            JSON.stringify({
                details,
                discord_link: discord_link.length ? discord_link : null,
                end_date: end_date || null,
                game_id: game.id,
                start_date: start_date || null,
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

                <div className="mb-8">
                    <Game {...game} />
                </div>

                <Form handle_create={handle_create} is_loading={is_loading} />
            </section>
        </div>
    );
};

export default Page;
