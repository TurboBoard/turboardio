import Video from "@Svgs/Video";

import { Claim } from "@Types";

const Component = ({ comment, created_at, is_winner, link, user }: Claim) => (
    <div className="relative py-7">
        {is_winner && (
            <div className="jumbo">
                <div className="jumbo__text">winner</div>
            </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center items-center">
            <div className="sm:flex-1 mb-6 sm:mb-0">
                <img alt={`{user.name} profile picture`} className="circle-image h-10 w-10 lg:h-11 lg:w-11" src={`${process.env.NEXT_PUBLIC_USER_IMAGES_CDN}/${user.id}.jpg`} />
            </div>

            <div>{comment && <p className="sm:w-3/4 mx-auto mb-0 text-center whitespace-pre-line">{comment}</p>}</div>

            <div className="absolute sm:static top-7 right-0 sm:flex-1 sm:flex sm:justify-end">
                <a className="fade-link block h-8 lg:h-9 text-byzantium" href={link} target="_blank">
                    <Video />
                </a>
            </div>
        </div>

        <div className="text-center">
            {/* prettier-ignore */}
            <small>
                Claim submitted on {created_at} by <span className="text-copy">{user.name}</span>
            </small>
        </div>
    </div>
);

export default Component;

// <div className="sm:flex-1 flex justify-center sm:justify-start mb-6">
//
//             </div>

//             <div className="sm:flex-1 sm:flex sm:items-center"></div>

//             <div className="absolute top-7 right-0 sm:static sm:flex-1">
//                 <div className="flex justify-end">
//                     <a className="fade-link block h-7 lg:h-8 text-byzantium" href={link} target="_blank">
//                         <Video />
//                     </a>
//                 </div>
//             </div>
