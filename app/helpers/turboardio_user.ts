import aws from "@Apis/aws";

import { TurboardioUser } from "@Types";

const get_turboardio_user = async (turboardio_user_id: TurboardioUser["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(turboardio_user_id),
        },
    });

    const { pronouns, src_handle, twitch_handle, twitter_handle, user_name } = aws.dynamo.unmarshall(Item);

    return {
        id: turboardio_user_id,
        name: user_name,
        pronouns: pronouns || null,
        src_handle: src_handle || null,
        twitch_handle: twitch_handle || null,
        twitter_handle: twitter_handle || null,
    };
};

const helpers = {
    get_turboardio_user,
};

export default helpers;
