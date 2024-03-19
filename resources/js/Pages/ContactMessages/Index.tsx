import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";
import ContactMessagesDataTable from "@/Components/ContactMessage/ContactMessagesDataTable";

export default function ContactMessagesIndexPage({ auth, contactMessages }: PageProps<{contactMessages: any}>) {
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Contact Messages'} />}>
            <Head title={'Contact Messages'} />

            <div className="p-5">
                <ContactMessagesDataTable contactMessages={contactMessages} />
            </div>
        </DashboardLayout>
    )
}
