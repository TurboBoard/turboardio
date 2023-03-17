import { useState } from "react";

import { useRouter } from "next/router";

import Form from "@Forms/edit/Details";

import { EditDetailsState } from "@States";

const Component = ({ edit_details, initial_state }: { edit_details: Function; initial_state: EditDetailsState }) => {
    const router = useRouter();

    const [is_loading, set_is_loading] = useState<boolean>(false);

    const handle_edit = async (EditDetailsState: EditDetailsState) => {
        set_is_loading(true);

        await edit_details(EditDetailsState);

        router.push("/account");
    };

    return <Form handle_edit={handle_edit} initial_state={initial_state} is_loading={is_loading} />;
};

export default Component;
