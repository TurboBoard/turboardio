import { Pledge } from "@Types";

const Component = ({ amount, user_id }: { amount: Pledge["amount"]; user_id: Pledge["user_id"] }) => (
    <div className="text-center">
        <img alt="User profile picture" className="circle-image h-10 w-10 mx-auto mb-5" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />

        <div className="heading text-accent text-4xl">${amount}</div>
    </div>
);

export default Component;
