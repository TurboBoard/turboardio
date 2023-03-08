const format = {
    iso: (iso: string): string => {
        const split = iso.split("T")[0].split("-");

        return `${split[1]}/${split[2]}/${split[0]}`;
    },
};

export default format;
