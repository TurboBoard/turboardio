import { Video } from "@Types";

const Twitch = ({ id }: { id: string }) => (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe className="h-full w-full" src={`https://player.twitch.tv/?video=${id}&autoplay=false&parent=localhost&parent=turboboard.io`} allowFullScreen />
    </div>
);

const YouTube = ({ id }: { id: string }) => (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
);

const Component = ({ id, type }: Video) => {
    if (type === "twitch") return <Twitch id={id} />;

    if (type === "youtube") return <YouTube id={id} />;

    return null;
};

export default Component;
