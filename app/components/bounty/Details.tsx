// @ts-nocheck
import dynamic from "next/dynamic";

const Date = dynamic(() => import("@Components/bounty/Date"), {
    ssr: false,
});

import Discord from "@Svgs/Discord";

const Component = ({ admin, created_at, details, discord_link, end_date, start_date }) => (
    <div className="space-y-7">
        <div>
            <h2>Details</h2>

            <p className="whitespace-pre-line">{details}</p>

            <div>
                {/* prettier-ignore */}
                <small>
                Bounty created on {created_at} by <span className="text-black">{admin.name}</span>
            </small>
            </div>
        </div>

        {(start_date || end_date) && (
            <div className="grid grid-cols-2 space-x-8">
                {start_date && (
                    <div>
                        <h3>Start Date</h3>

                        <Date date_string={start_date} />
                    </div>
                )}

                {end_date && (
                    <div>
                        <h3>End Date</h3>

                        <Date date_string={end_date} />
                    </div>
                )}
            </div>
        )}

        {discord_link && (
            <div>
                <h3>Links</h3>

                <div className="flex space-x-6">
                    <a className="highlight-link block h-8" href={discord_link} rel="noreferrer" target="_blank">
                        <Discord />
                    </a>
                </div>
            </div>
        )}
    </div>
);

export default Component;
