import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import ContactMessageEditForm from "@/Components/ContactMessage/ContactMessageEditForm";

export default function ContactMessageCreatePage({ auth, contactMessage }: PageProps<{contactMessage: any }>){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Edit Contact Message'} /> }>
            <Head title="Edit Contact Message" />

            <div className={`p-5`}>
                <ContactMessageEditForm contactMessage={contactMessage}/>
            </div>
        </DashboardLayout>
    );
}
