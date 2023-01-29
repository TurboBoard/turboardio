import Layout from "@Layouts/Bounties";

import { BountiesProps } from "@Props";

const Page = (props: BountiesProps) => {
    if (Object.keys(props).length === 0) return null;

    return <Layout {...props} />;
};

const bounties = [
    {
        admin: { id: "hHxa9hOoh-NmBlxEddkKZ", name: "Krukar" },
        claimed: false,
        created_at: "01/21/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co1uii.jpg", id: 1022, released: 1986, title: "The Legend of Zelda" },
        id: "4TUKKmUst_e5HyLQEdJfF",
        pledges: null,
    },
    {
        admin: { id: "m25jChU6CEPG_t2tps02X", name: "Test Account" },
        claimed: false,
        created_at: "01/17/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co1oo0.jpg", id: 47680, released: 1999, title: "WinBack: Covert Operations" },
        id: "jO5MSBVju7d6yzOQn7SnF",
        pledges: null,
    },
    {
        admin: { id: "m25jChU6CEPG_t2tps02X", name: "Test Account" },
        claimed: false,
        created_at: "01/17/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co3tu2.jpg", id: 1741, released: 1993, title: "Mega Man X" },
        id: "v5Ocf4GFK17CONWpDJJuA",
        pledges: null,
    },
    {
        admin: { id: "m25jChU6CEPG_t2tps02X", name: "Test Account" },
        claimed: false,
        created_at: "01/16/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co4qiz.jpg", id: 2324, released: 1999, title: "Pokémon Snap" },
        id: "_9jszQdNXA4dj29MBRdv8",
        pledges: null,
    },
    {
        admin: { id: "m25jChU6CEPG_t2tps02X", name: "Test Account" },
        claimed: false,
        created_at: "01/15/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co3mpz.jpg", id: 165257, released: 2021, title: "Mario 64 and Yoshi" },
        id: "pN9i0wxy1KpYoUqZVItHB",
        pledges: null,
    },
    {
        admin: { id: "hHxa9hOoh-NmBlxEddkKZ", name: "Krukar" },
        claimed: false,
        created_at: "01/15/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co1z8e.jpg", id: 8353, released: 2012, title: "Pokémon White Version 2" },
        id: "HkP_VmOleFJUhRP_6gsJg",
        pledges: null,
    },
    {
        admin: { id: "hHxa9hOoh-NmBlxEddkKZ", name: "Krukar" },
        claimed: false,
        created_at: "01/14/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co1z8e.jpg", id: 8353, released: 2012, title: "Pokémon White Version 2" },
        id: "MEq2JSfPz2ef8208S4FNF",
        pledges: null,
    },
    {
        admin: { id: "hHxa9hOoh-NmBlxEddkKZ", name: "Krukar" },
        claimed: false,
        created_at: "01/13/2023",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co3m8n.jpg", id: 19833, released: 2013, title: "Flashback" },
        id: "ESjLnX5ptZSM_XvUOngvN",
        pledges: null,
    },
    {
        admin: { id: "FBOGBxFSd0uTAY8YrXrjv", name: "First Try I Swear" },
        claimed: false,
        created_at: "11/11/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2r7p.jpg", id: 10801, released: 2014, title: "Runers" },
        id: "RO7SAma9kLsSs_EV6HLrL",
        pledges: [
            { amount: 100, id: "UD0bBr6q7a--ucgCHLWaj", user_id: "sFAJlPood4Qv4IoGQT3pH" },
            { amount: 100, id: "lNjIvejmWR6zFwwo5FEQf", user_id: "FBOGBxFSd0uTAY8YrXrjv" },
        ],
    },
    {
        admin: { id: "whGtp5MxwBCO0RoBgVmsu", name: "Mild Goth Daddy" },
        claimed: true,
        created_at: "11/09/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co4l30.jpg", id: 125263, released: 2018, title: "Spiders" },
        id: "lwbflmzJkttRa7a9pcL15",
        pledges: [
            { amount: 20, id: "kj3FbI-ZnydHiHECnUH87", user_id: "sFAJlPood4Qv4IoGQT3pH" },
            { amount: 30, id: "a2UoyEoJl0cXINgOJPrIL", user_id: "whGtp5MxwBCO0RoBgVmsu" },
        ],
    },
    {
        admin: { id: "FBOGBxFSd0uTAY8YrXrjv", name: "First Try I Swear" },
        claimed: true,
        created_at: "10/13/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2r7p.jpg", id: 10801, released: 2014, title: "Runers" },
        id: "oOPH4S8bL-V9ZKR-3zsFv",
        pledges: null,
    },
    {
        admin: { id: "whGtp5MxwBCO0RoBgVmsu", name: "Mild Goth Daddy" },
        claimed: true,
        created_at: "08/25/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "5DeqTY4JzhKqmFTLogTRI",
        pledges: [
            { amount: 20, id: "5yRLSFoj9kwqVcIQ7Ep8S", user_id: "sFAJlPood4Qv4IoGQT3pH" },
            { amount: 20, id: "9MxdVLwGsmFRwkOEYhSnT", user_id: "whGtp5MxwBCO0RoBgVmsu" },
        ],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "WVi2hWe9sjAvDE8F_1CYG",
        pledges: [{ amount: 50, id: "it9ab7scGrgMvDspkahHn", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "qoLVWOLsdBGd2pKgwMcTo",
        pledges: [{ amount: 20, id: "gRPXtg7wWJQFc2kjSkxfn", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "RGmWQfQiunX19nwQjRIMQ",
        pledges: [{ amount: 20, id: "5uDmaGrwxjzOgRMT-ts6n", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "fDa-SmNMIfg556k68NfVt",
        pledges: [{ amount: 10, id: "_W9Jr0HqroJHv5w9D6ya-", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "'-mBfc6h-Nxoz7j55mCzNd",
        pledges: [{ amount: 20, id: "w4m2YUoP6Bq5J__IusCRm", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "08/08/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "UpS4KAz4RZohdVOneJxv4",
        pledges: [{ amount: 10, id: "A7sjU-T2tln4zAKq-9KQk", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "07/31/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "kdDwm1B194DqxkYYyO8Aq",
        pledges: [{ amount: 100, id: "fxPziajOZ6bSBa2U7Jw3h", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "07/31/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "s6g7R6GkaxZLdQtqAV4fD",
        pledges: [{ amount: 100, id: "lkhIwcyvt05eAcNudJh1q", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "sFAJlPood4Qv4IoGQT3pH", name: "Turbo Board" },
        claimed: true,
        created_at: "07/31/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2eh6.jpg", id: 594, released: 2001, title: "Aliens versus Predator 2" },
        id: "'-dKsdt4-MbKvd7cKVAsby",
        pledges: [{ amount: 100, id: "9L0E2cXKJ4OQz_gwKTemC", user_id: "sFAJlPood4Qv4IoGQT3pH" }],
    },
    {
        admin: { id: "hHxa9hOoh-NmBlxEddkKZ", name: "Krukar" },
        claimed: false,
        created_at: "07/05/2022",
        game: { cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co26f8.jpg", id: 4275, released: 1992, title: "Flashback: The Quest for Identity" },
        id: "J8AWNiXTrC3MSFwQbx6af",
        pledges: [{ amount: 250, id: "0RrhvHlhDvolmzm5hYl9u", user_id: "hHxa9hOoh-NmBlxEddkKZ" }],
    },
];

export async function getStaticProps() {
    const props: BountiesProps = {
        bounties,
        meta: {
            description: "View the latest bounties or search for your favourite game.",
            title: "Latest bounties",
            url: `https://turboboard.io/bounties`,
        },
    };

    return {
        props,
        revalidate: 60,
    };
}

export default Page;
