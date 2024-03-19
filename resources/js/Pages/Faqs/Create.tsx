import DashboardLayout, {DashboardContainer, PageHeader} from "@/Layouts/DashboardLayout";
import {PageProps} from "@/types";
import {Head} from "@inertiajs/react";
import FaqCreateForm from "@/Components/FAQ/FaqCreateForm";

export default function FaqCreatePage({ auth }: PageProps){
    return (
        <DashboardLayout user={auth.user} header={<PageHeader title={'Add FAQ'} /> }>
            <Head title="Add FAQ" />

            <DashboardContainer className={`mt-10`}>
                <FaqCreateForm />
            </DashboardContainer>
        </DashboardLayout>
    );
}
