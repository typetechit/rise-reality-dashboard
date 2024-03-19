import {PageProps} from "@/types";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {Head} from "@inertiajs/react";
import InboxApp from "@/Components/Inbox/InboxApp";

export default function InboxIndexPage({auth}: PageProps) {
    return (
        <DashboardLayout user={auth.user}>
            <Head title={'Inbox'}/>

            <InboxApp />
        </DashboardLayout>
    )
}
