import aws from "@Apis/aws";

import { Bounty } from "@Types";

const get_bounty = async (
    bounty_id: Bounty["id"]
): Promise<{
    admin_id: string;
    bounty_id: string;
    created_at: string;
    details: string;
    end_date: string | null;
    game_id: number;
    start_date: string | null;
}> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    const { admin_id, created_at, details, end_date, game_id, start_date } = aws.dynamo.unmarshall(Item);

    return {
        admin_id,
        bounty_id,
        created_at,
        details,
        end_date: end_date || null,
        game_id,
        start_date: start_date || null,
    };
};

const helper = {
    get_bounty,
};

export default helper;
