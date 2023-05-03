import Label from "@Components/inputs/Label";

const Component = ({
    handle_change,
    label,
    options,
    required = false,
    value,
}: {
    handle_change: Function;
    label: string;
    options: { id: string; text: string }[];
    required?: boolean;
    value: string;
}) => (
    <div>
        <Label required={required || false} text={label} />

        <select className="select" onChange={(e) => handle_change(e.target.value)} value={value}>
            {options.map(({ id, text }) => (
                <option key={id} value={id}>
                    {text}
                </option>
            ))}
        </select>
    </div>
);

export default Component;
