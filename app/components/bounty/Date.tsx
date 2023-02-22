const Component = ({ date_string }: { date_string: string }) => {
    const date = new Date(date_string);

    return date.toLocaleDateString();
};

export default Component;
