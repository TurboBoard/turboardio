const Component = ({ id }: { id: string }) => (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
);

export default Component;
