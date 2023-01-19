import Label from "@Components/inputs/Label";

type Input = {
    disabled?: boolean;
    handle_change?: Function;
    id: string;
    label: string;
    max_length?: number;
    placeholder?: string;
    required?: boolean;
    type?: string;
    value: string;
};

const Component = ({ disabled, handle_change, id, label, max_length, placeholder, required = false, type = "text", value }: Input) => {
    const props = {
        id,
        label,
        value,
    } as {
        disabled: Input["disabled"];
        onChange?: React.ChangeEventHandler<HTMLInputElement>;
        id: Input["id"];
        label: Input["label"];
        maxLength: Input["max_length"];
        placeholder: Input["placeholder"];
        required: Input["required"];
        type: Input["type"];
        value: Input["value"];
    };

    if (disabled) props.disabled = disabled;

    if (handle_change) props.onChange = (e: React.FormEvent<HTMLInputElement>) => handle_change(id, e.currentTarget.value);

    if (max_length) props.maxLength = max_length;

    if (placeholder) props.placeholder = placeholder;

    if (required) props.required = required;

    if (type) props.type = type;

    return (
        <div>
            <Label required={required || false} text={label} />

            <input {...props} />
        </div>
    );
};

export default Component;
