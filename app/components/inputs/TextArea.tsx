import Label from "@Components/inputs/Label";

type TextArea = {
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

const Component = ({ disabled, handle_change, id, label, max_length, placeholder, required, type, value }: TextArea) => {
    const props = {
        id,
        label,
        value,
    } as {
        disabled: TextArea["disabled"];
        onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
        id: TextArea["id"];
        label: TextArea["label"];
        maxLength: TextArea["max_length"];
        placeholder: TextArea["placeholder"];
        required: TextArea["required"];
        type: TextArea["type"];
        value: TextArea["value"];
    };

    if (disabled) props.disabled = disabled;

    if (handle_change) props.onChange = (e: React.FormEvent<HTMLTextAreaElement>) => handle_change(id, e.currentTarget.value);

    if (max_length) props.maxLength = max_length;

    if (placeholder) props.placeholder = placeholder;

    if (required) props.required = required;

    if (type) props.type = type;

    return (
        <div>
            <div className="flex justify-between">
                <Label required={required || false} text={label} />

                {max_length && (
                    <div className="text-grey text-sm">
                        {value.length} / {max_length}
                    </div>
                )}
            </div>

            <textarea {...props} />
        </div>
    );
};

export default Component;
