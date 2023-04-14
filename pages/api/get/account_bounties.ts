import type { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import aws from "@Apis/aws";

import get_bounties_item from "@Services/get_bounties_item";

import { AccountBountiesProps } from "@Props";

const get_bounties = async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        user: { turboardio_user_id },
    } = await getSession(req, res);

    const { Items } = await aws.dynamo.scan({
        TableName: "turboardio_bounties",
        FilterExpression: "admin_id = :admin_id",
        ExpressionAttributeValues: {
            ":admin_id": aws.dynamo.input(turboardio_user_id),
        },
    });

    const bounties: AccountBountiesProps["bounties"] = [];

    if (!Items.length) {
        res.status(200).json({ bounties });

        return;
    }

    const sorted: any[] = Items.map((Item) => aws.dynamo.unmarshall(Item)).sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());

    for (const item of sorted) {
        const bounty_item = await get_bounties_item(item);

        bounties.push(bounty_item);
    }

    res.status(200).json({ bounties });
};

export default withApiAuthRequired(get_bounties);
