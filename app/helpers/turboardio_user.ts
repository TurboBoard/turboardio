import aws from "@Apis/aws";

import { TurboardioUser, User } from "@Types";

import { convert } from "@Lib";

const get_turboardio_user = async (user_id: User["id"]): Promise<TurboardioUser> => {
    const { Item } = await aws.dynamo.get_item({
        TableName: "turboardio_users",
        Key: {
            user_id: aws.dynamo.input(user_id),
        },
    });

    return convert.turboardio_user(aws.dynamo.unmarshall(Item));
};

const helpers = {
    get_turboardio_user,
};

export default helpers;
