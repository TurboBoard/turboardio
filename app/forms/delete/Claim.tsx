import Button from "@Components/inputs/Button";

const Form = ({ handle_delete, is_loading }) => {
    const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handle_delete();
    };

    return (
        <form className="space-y-8" onSubmit={handle_submit}>
            <Button is_loading={is_loading} text="Delete Claim" />
        </form>
    );
};

export default Form;
