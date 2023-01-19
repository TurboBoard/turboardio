import Loading from "@Components/Loading";

const Component = ({ is_disabled, is_loading, text }: { is_disabled?: boolean; is_loading?: boolean; text: string }) => {
    let button_class_name = "button w-full";

    if (is_loading) {
        button_class_name += " button--loading";
    }

    return (
        <button className={button_class_name} disabled={is_disabled}>
            {is_loading ? <Loading /> : text}
        </button>
    );
};

export default Component;
