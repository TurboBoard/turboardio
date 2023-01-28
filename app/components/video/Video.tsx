import Twitch from "@Components/video/Twitch";
import Youtube from "@Components/video/YouTube";

import { Video } from "@Types";

const Component = ({ id, type }: Video) => {
    if (type === "twitch") return <Twitch id={id} />;

    if (type === "youtube") return <Youtube id={id} />;

    return null;
};

export default Component;
