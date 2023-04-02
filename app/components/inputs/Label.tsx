const Component = ({ required, text }: { required: boolean; text: string }) => (
    <label className="label">
        {text} {required && <span>*</span>}
    </label>
);

export default Component;
