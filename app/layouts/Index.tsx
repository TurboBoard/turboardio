import Contact from "@Components/Contact";

import Link from "next/link";

import BountiesItem from "@Components/BountiesItem";
import User from "@Components/User";
import Video from "@Components/Video";

import Discord from "@Svgs/Discord";
import Github from "@Svgs/Github";
import Tiger from "@Svgs/Tiger";

import { HomeProps } from "@Props";

const Layout = ({ featured, latest_winning_claim, leaderboard }: HomeProps) => (
    <div>
        <section className="sm:flex sm:justify-center sm:items-center sm:space-x-8 md:space-x-9 lg:space-x-10">
            <div className="text-center sm:text-left">
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
                    {latest_winning_claim.video && <Video {...latest_winning_claim.video} />}

                    {latest_winning_claim.comment && (
                        <p className="mt-7 mx-auto text-center whitespace-pre-line">
                            <em>{latest_winning_claim.comment}</em>
                        </p>
                    )}
                </div>

                <div key={latest_winning_claim.winner.user.id} className="flex justify-between items-center">
                    <User {...latest_winning_claim.winner.user} />

                    <div className="hidden xs:block heading text-accent text-4xl 2xl:text-5xl">${latest_winning_claim.winner.amount}</div>
                </div>
            </section>

            <section className="lg:w-1/2">
                <h1 className="text-center">Leaderboard</h1>

                <div className="space-y-7">
                    {leaderboard.map(({ amount, user }) => (
                        <div key={user.id} className="flex justify-between items-center">
                            <User {...user} />

                            <div className="hidden xs:block heading text-accent text-4xl 2xl:text-5xl">${amount}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        <div>
            <div className="divider divider--left-down bg-pink" />

            <div className="gutter pt-5 md:pt-6 lg:pt-7 bg-pink">
                <div className="lg:w-2/3 lg:mx-auto">
                    <h1 className="mb-5 text-white text-center">Featured Bounty</h1>

                    <div className="bounties-item--light">
                        <BountiesItem {...featured} />
                    </div>
                </div>
            </div>

            <div className="divider divider--right-up -mt-1 bg-pink" />
        </div>

        <section className="md:w-2/3 md:mx-auto">
            <h1 className="text-center">Get In Touch</h1>

            <Contact />
        </section>
    </div>
);

export default Layout;
