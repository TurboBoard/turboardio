import User from "@Components/user/User";
import Video from "@Components/video/Video";

import { Claim } from "@Types";

const Component = ({ comment, user, video }: Claim) => (
    <div>
        <div className="mb-8">
            {video && (
                <div className="mb-8">
                    <Video {...video} />
                </div>
            )}

            {comment && (
                <p className="mx-auto text-center whitespace-pre-line">
                    <em>{comment}</em>
                </p>
            )}
        </div>

        <User {...user} />
    </div>
);

export default Component;
