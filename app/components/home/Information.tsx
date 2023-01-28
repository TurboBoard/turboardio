import Link from "next/link";

import Discord from "@Svgs/Discord";
import Github from "@Svgs/Github";
import Tiger from "@Svgs/Tiger";

const Component = () => (
    <section className="sm:flex sm:justify-center sm:items-center sm:space-x-8 md:space-x-9 lg:space-x-10">
        <div>
            <h1 className="mb-6">
                Video Game
                <br />
                Bounty Board
            </h1>

            {/* prettier-ignore */}
            <p className="mb-8">Create/Pledge/Claim video game bounties.<br />Read the <Link href="/page/faq"><a className="generic-link">FAQ</a></Link> or check out the <Link href="/bounties"><a className="generic-link">Bounty Board.</a></Link></p>

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
);

export default Component;
