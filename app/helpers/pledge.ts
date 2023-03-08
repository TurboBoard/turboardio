import aws from "@Apis/aws";

import { Bounty, Pledge } from "@Types";

const get_pledges = async (bounty_id: Bounty["id"]): Promise<Bounty["pledges"]> => {
    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_pledges",
        FilterExpression: "bounty_id = :bounty_id",
        ExpressionAttributeValues: {
            ":bounty_id": aws.dynamo.input(bounty_id),
        },
    });

    if (!Items.length) return null;

    const pledges: Pledge[] = [];

    for (const Item of Items) {
        const { amount, pledge_id, user_id } = aws.dynamo.unmarshall(Item);

        const pledge: Pledge = {
            amount,
            id: pledge_id,
            user_id,
        };

        pledges.push(pledge);
    }

    return pledges;
};

const helper = {
    get_pledges,
};

export default helper;
