import DashboardLayout, {PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import ContactMessageCreateForm from "@/Components/ContactMessage/ContactMessageCreateForm";

export default function ContactMessageCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add Contact Message'} /> }>
            <Head title="Add Contact Message" />

            <div className={`p-5`}>
                <ContactMessageCreateForm/>
            </div>
        </DashboardLayout>
    );
}
