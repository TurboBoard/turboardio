import Contact from "@Components/Contact";
import Leaderboard from "@Components/Leaderboard";

import Link from "next/link";

import Discord from "@Svgs/Discord";
import Github from "@Svgs/Github";
import Tiger from "@Svgs/Tiger";
import User from "@Components/User";
import Video from "@Components/Video";

import { HomeProps } from "@Props";

const Page = ({ claim: { comment, user, video }, leaderboard }: HomeProps) => (
    <div>
        <section className="sm:flex sm:justify-center sm:items-center sm:space-x-8 md:space-x-9 lg:space-x-10">
            <div>
                <h1 className="mb-6">
                    Video Game
                    <br />
                    Bounty Board
                </h1>

                {/* prettier-ignore */}
                <p className="mb-8">Create/Pledge/Claim video game bounties.<br />Read the <Link href="/page/faq" className="generic-link">FAQ</Link> or check out the <Link href="/bounties" className="generic-link">Bounty Board.</Link></p>

                <div className="space-x-6">
                    <a className="button button--highlight button-social button-social--discord" href="https://discord.gg/7cZvW3AZ7M" target="_blank">
                        <span className="button-social__icon">
                            <Discord />
                        </span>

                        <span className="button-social__text">Discord</span>
                    </a>

                    <a className="button button--highlight button-social button-social--github" href="https://github.com/TurboBoard/turboardio" target="_blank">
                        <span className="button-social__icon">
                            <Github />
                        </span>

                        <span className="button-social__text">Github</span>
                    </a>
                </div>
            </div>

            <div className="hidden sm:block w-1/3 lg:w-1/4">
                <div className="max-w-[360px]">
                    <Tiger />
                </div>
            </div>
        </section>

        <div className="lg:flex">
            <section className="lg:w-1/2">
                <h1 className="text-center">Latest Winner</h1>

                <div className="mb-8">
                    {video && (
                        <div className="mb-8">
                            <Video {...video} />
                        </div>
                    )}

                    {comment && (
                        <p className="mx-auto text-center whitespace-pre-line">
                            <em>{comment}</em>
                        </p>
                    )}
                </div>

                <User {...user} />
            </section>

            <section className="lg:w-1/2">
                <h1 className="text-center">Leaderboard</h1>

                <Leaderboard leaderboard={leaderboard} />
            </section>
        </div>

        <div className="gutter">
            <hr />
        </div>

        <section>
            <Contact />
        </section>
    </div>
);

export default Page;
