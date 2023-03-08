import Dots from "@Components/Dots";
import Tiger from "@Svgs/Tiger";

const Component = () => (
    <div className="relative h-[30vw] flex justify-center">
        <div className="h-full opacity-25">
            <Tiger />
        </div>

        <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="h1">
                Loading
                <Dots />
            </h1>
        </div>
    </div>
);

export default Component;
