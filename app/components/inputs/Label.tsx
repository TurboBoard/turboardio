const Component = ({ required, text }: { required: boolean; text: string }) => (
    <label>
        {text} {required && <span>*</span>}
    </label>
);

export default Component;
