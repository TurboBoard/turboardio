import { BountyHelper, ClaimHelper, GameHelper, PledgeHelper, TurboardioUserHelper } from "@Helpers";

import { Bounty } from "@Types";

import { format } from "@Lib";

const get_bounty = async (bounty_id: Bounty["id"]): Promise<Bounty> => {
    const { admin_id, created_at, details, end_date, game_id, start_date } = await BountyHelper.get_bounty(bounty_id);

    const admin = await TurboardioUserHelper.get_turboardio_user(admin_id);

    const claims = await ClaimHelper.get_claims(bounty_id);

    const game = await GameHelper.get_game(game_id);

    const pledges = await PledgeHelper.get_pledges(bounty_id);

    const is_claimed = claims ? claims.some((e) => e.is_winner) : false;

    const today = new Date().toISOString().substring(0, 10);

    const is_expired = !end_date ? false : end_date < today;

    const bounty: Bounty = {
        admin,
        amount: pledges ? pledges.reduce((acc, { amount }) => acc + amount, 0) : null,
        claims,
        created_at: format.iso(created_at),
        details,
        end_date: end_date || null,
        game,
        id: bounty_id,
        is_claimed,
        is_expired,
        pledges,
        start_date: start_date || null,
    };

    return bounty;
};

export default get_bounty;
