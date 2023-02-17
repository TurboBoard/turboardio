import { Pledge } from "@Types";

const Component = ({ pledges }: { pledges: Pledge[] }) => {
    if (!pledges) {
        return <p className="mb-0">There are currently no pledges for this bounty.</p>;
    }

    return (
        <div className="flex space-x-7">
            {pledges.map(({ amount, id, user_id }) => (
                <div key={id} className="text-center">
                    <img alt="User profile picture" className="circle-image h-10 w-10 mx-auto mb-5" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user_id}.jpg`} />

                    <div className="heading text-accent text-4xl">${amount}</div>
                </div>
            ))}
        </div>
    );
};

export default Component;
