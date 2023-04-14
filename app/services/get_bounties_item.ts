import { ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import { BountiesItem } from "@Types";

import { format } from "@Lib";

const get_bounties_item = async ({
    admin_id,
    bounty_id,
    created_at,
    end_date,
    game_id,
}: {
    admin_id: string;
    bounty_id: string;
    created_at: string;
    end_date: string;
    game_id: number;
}): Promise<BountiesItem> => {
    const admin = await TurboardioUserHelper.get_turboardio_user(admin_id);

    const game = await GameHelper.get_game(game_id);

    const is_claimed = await ClaimHelper.get_is_claimed(bounty_id);

    const pledges = await PledgeHelper.get_pledges(bounty_id);

    const today = new Date().toISOString().substring(0, 10);

    return {
        admin: {
            id: admin.id,
            name: admin.name,
        },
        amount: pledges ? pledges.reduce((acc, { amount }) => (acc += amount), 0) : null,
        created_at: format.iso(created_at),
        end_date: end_date || null,
        game,
        id: bounty_id,
        is_claimed,
        is_expired: !end_date ? null : end_date < today,
        pledges,
    };
};

export default get_bounties_item;
