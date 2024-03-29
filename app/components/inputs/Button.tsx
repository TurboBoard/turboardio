import Dots from "@Components/Dots";

const Component = ({ is_disabled, is_loading, text }: { is_disabled?: boolean; is_loading?: boolean; text: string }) => {
    let button_class_name = "button w-full";

    if (is_loading) {
        button_class_name += " button--loading";
    }

    return (
        <button className={button_class_name} disabled={is_disabled || is_loading}>
            {is_loading ? (
                <span>
                    Loading
                    <Dots />
                </span>
            ) : (
                text
            )}
        </button>
    );
};

export default Component;
