import aws from "@Apis/aws";

import TurboardioUserHelper from "./turboardio_user";

import { Bounty, Claim } from "@Types";

import { format } from "@Lib";

const get_claims = async (bounty_id: Bounty["id"]): Promise<Bounty["claims"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const claims: Claim[] = [];

    const sorted = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const { amount, comment, created_at, claim_id, link, user_id } of sorted) {
        const user = await TurboardioUserHelper.get_turboardio_user(user_id);

        const claim: Claim = {
            comment: comment || null,
            created_at: format.iso(created_at),
            id: claim_id,
            is_winner: amount ? true : false,
            link,
            user,
        };

        claims.push(claim);
    }

    return claims;
};

const get_is_claimed = async (bounty_id: Bounty["id"]): Promise<Bounty["is_claimed"]> => {
    const { Count, Items } = await aws.dynamo.scan({
        TableName: "turboardio_claims",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Count) return false;

    return Items.some((Item) => {
        const { amount } = aws.dynamo.unmarshall(Item);

        return amount;
    });
};

const helper = {
    get_claims,
    get_is_claimed,
};

export default helper;
