import aws from "@Apis/aws";

import { Bounty } from "@Types";

const get_bounty = async (bounty_id: Bounty["id"]) => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_bounties",
        Key: {
            bounty_id: aws.dynamo.input(bounty_id),
        },
    });

    return aws.dynamo.unmarshall(Item);
};

const helper = {
    get_bounty,
};

export default helper;
