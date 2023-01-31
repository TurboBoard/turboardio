import Claim from "@Components/claim/Claim";
import Contact from "@Components/home/Contact";
import Information from "@Components/home/Information";
import Leaderboard from "@Components/home/Leaderboard";

import { HomeProps } from "@Props";

const Page = ({ claim, leaderboard }: HomeProps) => (
    <div>
        <Information />

        <div className="lg:flex">
            <section className="lg:w-1/2">
                <h1 className="text-center">Latest Winner</h1>

                <Claim {...claim} />
            </section>

            <section className="lg:w-1/2">
                <h1 className="text-center">Leaderboard</h1>

                <Leaderboard leaderboard={leaderboard} />
            </section>
        </div>

        <Contact />
    </div>
);

export default Page;
