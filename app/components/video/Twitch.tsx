const Component = ({ id }: { id: string }) => (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe className="h-full w-full" src={`https://player.twitch.tv/?video=${id}&autoplay=false&parent=localhost&parent=turboboard.io`} allowFullScreen />
    </div>
);

export default Component;
